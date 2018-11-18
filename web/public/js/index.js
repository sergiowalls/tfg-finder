(() => {
  const dataAccess = TFGFinder.Util.getDataAccess('Api');

  let table = null;
  
  const onAllTabClick = () => {
    dataAccess.getProposals()
      .then(proposals => {
        loadTable(proposals);
      });
  };

  const onMineTabClick = () => {
    dataAccess.getOwnProposals()
      .then(proposals => {
        loadTable(proposals);
      });
  };

  const loadTable = (proposals) => {
    var data = proposals.map((proposal) => {
      return [
        proposal.id,
        proposal.title,
        proposal.proposer.name,
        proposal.keywords.join(', '),
        TFGFinder.Util.translateState(proposal.state)
      ]
    });
    if (table) {
      table.destroy();
    }
    table = $('#test-table').DataTable( {
      data: data,
      columns: [
          { title: "Id" },
          { title: "T&iacute;tol" },
          { title: "Proposat per" },
          { title: "Paraules clau" },
          { title: "Estat" }
      ],
        columnDefs: [
            {
                targets: [0],
                visible: false
            }
        ],
      language: {
          url: "/cat.json"
      }
    });

    let $select = $("select");
    $select.val('10');
    $select.addClass("browser-default");

    $('#test-table tbody').on('click', 'tr', function () {
      const data = table.row( this ).data();
      const proposalId = data[0];
      window.location.href = '/proposals/' + proposalId;
    });
  };

  const allProposalsTab = $('#all-proposals-tab');
  allProposalsTab.on('click', onAllTabClick);
  const mineProposalsTab = $('#mine-proposals-tab');
  mineProposalsTab.on('click', onMineTabClick);

  onAllTabClick();
})();