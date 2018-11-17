(() => {
  TFGFinder.DataAccess.ApiMock = {
    getProposals: () => {
      const promise = new Promise((resolve, reject) => {
        resolve(proposals);
      });

      return promise;
    }
  };
})();

const proposals = [
  {
    id: 0,
    title: "A fuck system to improve Lorem Ipsum",
    proposer: {
      name: "Prof. Emilio Pardo"
    },
    keywords: ["fuck", "porn"]
  },
  {
    id: 1,
    title: "Sex forecasting in Smart Cities",
    proposer: {
      name: "Prof. Diana Lapiedra"
    },
    keywords: ["sex", "forecast"]
  },
  {
    id: 2,
    title: "Enjoy the glory hole",
    proposer: {
      name: "Prof. Carolina Abril"
    },
    keywords: ["glory", "hole", "gloryhole"]
  }
];