import { defineStore } from 'pinia';
import axios, { AxiosResponse } from 'axios';
import { useNuxtApp } from '#app';
import { User } from '~/typings/api';

export interface UserState {
    user: User | undefined;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: undefined
  }),
  getters: {
    isLoggedIn: (state: UserState) => !!state.user,
    displayName: (state: UserState) => {
      if (state.user?.minecraftProfile) {
        return state.user.minecraftProfile.username;
      } else if (state.user?.discordProfile) {
        return state.user.discordProfile.username;
      }
      return undefined;
    },
    displayAvatar: (state: UserState) => {
      if (state.user?.minecraftProfile) {
        return `https://avatars.tl-events.fr/helms/${state.user.minecraftProfile.uuid}.png`;
      } else {
        return 'https://cdn.discordapp.com/embed/avatars/0.png';
      }
    }
  },
  actions: {
    async fetchUser () {
      this.user = await axios.get('https://api.tl-events.fr/v2/auth/self', {
        withCredentials: true
      }).catch(() => {
        this.user = undefined;
      }).then((response: AxiosResponse<User>) => response?.data);
    },
    async getLoginUrl () {
      const response = await axios.get('https://api.tl-events.fr/v2/auth/login', {
        withCredentials: true
      }).catch(() => {
        useNuxtApp().$toast.error('Une erreur est survenue lors de la connexion.');
      }).then((response: AxiosResponse<{ loginUrl: string }>) => response?.data);
      return response?.loginUrl;
    }
  }
});
