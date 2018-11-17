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
          { title: "Title" },
          { title: "Proposer" },
          { title: "Keywords" }
        ],
        columnDefs: [
          {
            targets: [0],
            visible: false
          }
        ]
      });
    
      $("select").val('10');
      $('select').addClass("browser-default");

      $('#test-table tbody').on('click', 'tr', function () {
        const data = table.row( this ).data();
        const proposalId = data[0]; 
        window.location.href = '/proposals/' + proposalId;
      });
    });
})();