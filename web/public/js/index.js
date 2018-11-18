(() => {
  TFGFinder.DataAccess.ApiMock.getProposals()
    .then(proposals => {
      var data = proposals.map((proposal) => {
        return [
          proposal.id,
          proposal.title,
          proposal.proposer.name,
          proposal.keywords.join(', ')
        ]
      });
      var table = $('#test-table').DataTable( {
        data: data,
        columns: [
            { title: "Id" },
            { title: "T&iacute;tol" },
            { title: "Proposat per" },
            { title: "Paraules clau" }
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
    });
})();