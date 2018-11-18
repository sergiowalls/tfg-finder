(() => {
  TFGFinder.DataAccess.ApiMock = function() {
    let self = {};

    self.getProposals = () => {
      const promise = new Promise((resolve, reject) => {
        resolve(proposals);
      });

      return promise;
    }

    self.getOwnProposals = () => {
      const promise = new Promise((resolve, reject) => {
        if (!TFGFinder.Resources.UserEmail) {
          reject('No user logged in');
          return;
        }

        const filteredProposals = proposals.filter(x => x.proposer.email === TFGFinder.Resources.UserEmail);
        resolve(filteredProposals);
      })

      return promise;
    }

    self.getProposalById = (id) => {
      const promise = new Promise((resolve, reject) => {
        const proposal = proposals.filter(x => x.id === id)[0];
        resolve(proposal);
      });

      return promise;
    }

    self.getProposalHistory = (proposalId) => {
      const promise = new Promise((resolve, reject) => {
        const proposals = proposalHistories;
        resolve(proposals);
      });

      return promise;
    }

    self.login = (email, password) => {
      const promise = new Promise((resolve, reject) => {
        const user = users.filter(x => x.email === email)[0];
        resolve(user);
      });

      return promise;
    }

    return self;
  };
})();

const users = [
  {
    email: 'student@test.com',
    name: 'Estudiant',
    role: 'student'
  },
  {
    email: 'professor@test.com',
    name: 'Professor',
    role: 'professor'
  },
  {
    email: 'student@test.com',
    name: 'Coordinador',
    role: 'coordinator'
  }
];

const proposals = [
  {
    id: 0,
    title: "A fuck system to improve Lorem Ipsum",
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et porttitor quam. Nunc ut est augue. Phasellus condimentum odio leo.',
    proposer: {
      name: "Prof. Emilio Pardo",
      role: 'professor'
    },
    keywords: ["fuck", "porn"],
    objectives: [],
    state: 'proposed'
  },
  {
    id: 1,
    title: "Sex forecasting in Smart Cities",
    description: 'Maecenas tempus urna ex, et vulputate ante porta eu. Pellentesque elementum nulla orci, a consectetur mauris interdum in. Proin sollicitudin nisl mauris, id tincidunt ligula tincidunt egestas. Proin vitae tincidunt erat. Nam ex ex, dictum.',
    proposer: {
      name: "Prof. Diana Lapiedra",
      role: 'professor'
    },
    keywords: ["sex", "forecast"],
    objectives: [
      'Sed lectus sem, volutpat sit amet est quis, lacinia placerat felis. Phasellus malesuada tortor eget efficitur rutrum.',
      'Nulla facilisis velit lacus, in lobortis mi vulputate ac.',
      'Nam at augue eu eros consequat varius.'
    ],
    state: 'modified'
  },
  {
    id: 2,
    title: 'Enjoy the glory hole',
    description: 'Nullam non rhoncus dolor. Praesent volutpat vehicula elit, sed mollis justo condimentum ut. Cras libero tortor, vehicula sit amet pharetra ut, posuere nec lacus. Mauris diam nisi, consequat et quam nec, placerat suscipit sapien. Ut quis viverra ligula, id volutpat ante. Nulla tincidunt magna ex, ac ultrices lacus tristique a. Sed pharetra dapibus ligula.',
    proposer: {
      name: "Prof. Carolina Abril",
      role: 'professor'
    },
    keywords: ["glory", "hole", "gloryhole"],
    objectives: [],
    state: 'pending'
  },
  {
    id: 3,
    title: 'Ganbang in the whitehouse',
    description: 'Nullam non rhoncus dolor. Praesent volutpat vehicula elit, sed mollis justo condimentum ut. Cras libero tortor, vehicula sit amet pharetra ut, posuere nec lacus. Mauris diam nisi, consequat et quam nec, placerat suscipit sapien. Ut quis viverra ligula, id volutpat ante. Nulla tincidunt magna ex, ac ultrices lacus tristique a. Sed pharetra dapibus ligula.',
    proposer: {
      name: "Barak Obama",
      role: 'student'
    },
    keywords: ["gangbang", "hole", "bukkake"],
    objectives: [
      'Make Trump cry',
      'Make Melisa Trump cry'
    ],
    state: 'finished'
  }
];

const proposalHistories = [
  {
    id: 3,
    proposalId: 0,
    title: "A fuck system to improve Lorem Ipsum (updated)",
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et porttitor quam. Nunc ut est augue. Phasellus condimentum odio leo.',
    proposer: {
      name: "Prof. Emilio Pardo",
      role: 'professor'
    },
    keywords: ["fuck", "porn", "hack"],
    objectives: [
      'Improve Lorem Ipsum'
    ],
    state: 'proposed'
  },
  {
    id: 2,
    proposalId: 0,
    title: "A fuck system to improve Lorem Ipsum (updated)",
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et porttitor quam. Nunc ut est augue. Phasellus condimentum odio leo.',
    proposer: {
      name: "Prof. Emilio Pardo",
      role: 'professor'
    },
    keywords: ["fuck", "porn"],
    objectives: [
      'Improve Lorem Ipsum'
    ],
    state: 'proposed'
  },
  {
    id: 1,
    proposalId: 0,
    title: "A fuck system to improve Lorem Ipsum",
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et porttitor quam. Nunc ut est augue. Phasellus condimentum odio leo.',
    proposer: {
      name: "Prof. Emilio Pardo",
      role: 'professor'
    },
    keywords: ["fuck", "porn"],
    objectives: [
      'Improve Lorem Ipsum'
    ],
    state: 'modified'
  },
  {
    id: 0,
    proposalId: 0,
    title: "A fuck system to improve Lorem Ipsum",
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et porttitor quam. Nunc ut est augue. Phasellus condimentum odio leo.',
    proposer: {
      name: "Prof. Emilio Pardo",
      role: 'professor'
    },
    keywords: ["fuck", "porn"],
    objectives: [],
    state: 'proposed'
  }
];