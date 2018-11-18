(() => {
  TFGFinder.DataAccess.Api = function() {
    let self = {};
    let URL = 'http://localhost:3003/';

    self.getProposals = () => {
        return new Promise((resolve, reject) => {
            const proposal = $.get(URL + 'proposals/');
            resolve(proposal);
        });
    };

    self.getOwnProposals = () => {
        return new Promise((resolve, reject) => {
            let email = localStorage.getItem('user');
            if (!email) {
                reject('No user logged in');
                return;
            }
            $.get(URL + 'proposals/', function (data) {
                const filteredProposals = data.filter(x => x.proposer === email);
                resolve(filteredProposals);
            });

        });

    };

    self.getProposalById = (id) => {
        return new Promise((resolve, reject) => {
            const proposal = $.get(URL + 'proposals/' + id);
            resolve(proposal);
        });
    };

    self.login = (email, password) => {
      // TODO
    };

      self.getProposalHistory = (proposalId) => {
          const promise = new Promise((resolve, reject) => {
              const proposals = proposalHistories;
              resolve(proposals);
          });

          return promise;
      };

    return self;
  };
})();