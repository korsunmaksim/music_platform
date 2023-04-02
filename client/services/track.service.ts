import axios from "axios";
import { Dispatch } from "redux";
import { NextRouter } from "next/router";
import { APP_KEYS } from "@/common/consts";
import { ETrackActionTypes, TrackAction } from "@/common/types/track.types";

export class TrackService {
  public getTracks() {
    return async (dispatch: Dispatch<TrackAction>) => {
      try {
        const res = await axios.get(APP_KEYS.BACKEND_KEYS.TRACKS_URL);
        dispatch({ type: ETrackActionTypes.FETCH_TRACKS, payload: res.data });
      } catch (e) {
        dispatch({
          type: ETrackActionTypes.FETCH_TRACKS_ERROR,
          payload: "Error occured!",
        });
      }
    };
  }

  public searchTracks(query: string) {
    return async (dispatch: Dispatch<TrackAction>) => {
      try {
        const res = await axios.get(APP_KEYS.BACKEND_KEYS.SEARCH_URL + query);
        dispatch({ type: ETrackActionTypes.FETCH_TRACKS, payload: res.data });
      } catch (e) {
        dispatch({
          type: ETrackActionTypes.FETCH_TRACKS_ERROR,
          payload: "Error occured!",
        });
      }
    };
  }

  public async createTrack(formData: FormData, router: NextRouter) {
    await axios
      .post(APP_KEYS.BACKEND_KEYS.TRACKS_URL, formData)
      .then((res) => router.push(APP_KEYS.ROUTES.TRACKS))
      .catch((e) => console.log(e));
  }

  public async getTrack(id: string) {
    const track = await axios.get(APP_KEYS.BACKEND_KEYS.TRACKS_URL + id);
    return track.data;
  }

  public async sendComment(username: string, text: string, trackId: string) {
    const res = await axios.post(APP_KEYS.BACKEND_KEYS.COMMENTS_URL, {
      username: username,
      text: text,
      trackId: trackId,
    });
    return res.data;
  }

  public async deleteTrack(id: string, router: NextRouter) {
    await axios
      .delete(APP_KEYS.BACKEND_KEYS.TRACKS_URL + id)
      .then((res) => router.push(APP_KEYS.ROUTES.TRACKS));
  }

  public async listen(id: string) {
    await axios.post(APP_KEYS.BACKEND_KEYS.LISTEN_URL + id, { id });
  }
}

const trackService = new TrackService();

export default trackService;
