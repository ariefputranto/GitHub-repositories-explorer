interface HomeState {
  loadingUsername: boolean;
  loadingRepository: boolean;
  username: string;
  searchedUsernames: Username[];
  repositories: Repository[];

  setUsername: (username: string) => void;
  searchUsername: () => void;
  searchRepository: (username: string) => void;
  toggleSearchedUsernameRepository: (username: Username) => void;
  hideAllRepositories: () => void;
};