import { GetRepository, GetUsername } from "@/api/github/route";
import { toast } from "react-toastify";
import { create } from "zustand";

export const useHomeStore = create<HomeState>((set, get) => ({
  loadingUsername: false,
  loadingRepository: false,
  username: "",
  searchedUsernames: [] as Username[],
  repositories: [] as Repository[],

  setUsername: (username: string) => set({ username: username }),
  searchUsername: async () => {
    set({ loadingUsername: true });
    try {
      const response = await GetUsername(get().username) as GetUsernameResponse;
      set({ searchedUsernames: response.items });
    } catch (error) {
      toast.error('Error fetching username');
      console.error("error", error);
    } finally {
      set({ loadingUsername: false });
    }
  },
  searchRepository: async (username: string) => {
    set({ loadingRepository: true });
    try {
      const response = await GetRepository(username) as Repository[];
      if (response.length === 0) {
        get().hideAllRepositories()
      }
      set({ repositories: response });
    } catch (error) {
      toast.error('Error fetching repositories');
      console.error("error", error);
    } finally {
      set({ loadingRepository: false });
    }
  },
  toggleSearchedUsernameRepository: (username: Username) => {
    set((state) => {
      const userIndex = state.searchedUsernames.findIndex((user) => user.login === username.login);
      if (userIndex === -1) {
        return state;
      }

      const searchedUsernames = [...state.searchedUsernames];
      const oldValue = searchedUsernames[userIndex].is_showing_repositories
      searchedUsernames.forEach((user) => user.is_showing_repositories = false);
      searchedUsernames[userIndex].is_showing_repositories = !oldValue;
      return { searchedUsernames: searchedUsernames };
    });
  },
  hideAllRepositories: () => {
    set((state) => {
      const searchedUsernames = [...state.searchedUsernames];
      searchedUsernames.forEach((user) => user.is_showing_repositories = false);
      return { searchedUsernames: searchedUsernames };
    });
  }
}));
