import { useHomeStore } from '@/store/home';
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faStar, faSpinner } from "@fortawesome/free-solid-svg-icons";

const SearchResult = () => {
  const { username, searchedUsernames, repositories, loadingRepository, searchRepository, toggleSearchedUsernameRepository } = useHomeStore()

  const onUsernameClicked = (username: Username) => {
    if (!username.is_showing_repositories) {
      searchRepository(username.login);
    }
    toggleSearchedUsernameRepository(username);
  }

  const redirectRepo = (repo: Repository) => () => {
    window.open(repo.html_url, '_blank');
  }

  return (
    <div>
      {searchedUsernames.length > 0 && (
        <div>
          <p className="text-sm mb-3 mt-3">Showing users for "{username}"</p>
          <div className='max-h-full overflow-y-auto'>
            {searchedUsernames.map((username, index) => (
              <div className='mb-3' key={index}>
                {/* username */}
                <div onClick={() => onUsernameClicked(username)} className="bg-gray-200 px-4 py-2 flex justify-between items-center cursor-pointer mb-3">
                  <p className="text-sm">{username.login}</p>
                  <div>
                    {!username.is_showing_repositories && <FontAwesomeIcon icon={faChevronDown} />}
                    {username.is_showing_repositories && <FontAwesomeIcon icon={faChevronUp} />}
                  </div>
                </div>

                {/* repositories */}
                <div className="mb-3 pl-6">
                  {username.is_showing_repositories && loadingRepository && (
                    <div className='flex justify-center items-center'>
                      <FontAwesomeIcon icon={faSpinner} spin size="2xl" />
                    </div>
                  )}
                  {username.is_showing_repositories && !loadingRepository && repositories.map((repo, index) => (
                    <div key={index} className="bg-gray-300 px-4 py-2 mb-3 cursor-pointer" onClick={redirectRepo(repo)}>
                      <div className='flex justify-between items-center'>
                        <p className="text-lg font-bold">{repo.name}</p>
                        <div className='flex items-center gap-1 sm:gap-2'>
                          <p>{repo.stargazers_count}</p>
                          <FontAwesomeIcon icon={faStar} size='xs' />
                        </div>
                      </div>
                      <p className='text-sm'>{repo.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResult;