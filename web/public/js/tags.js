(() => {

    let allChips, table;

    function updateChips() {
        let chips = M.Chips.getInstance($('.chips')).chipsData.map((x) => x.tag);
        $.ajax({
            url: "http://localhost:3003/users/" + localStorage.getItem('user') + "/keywords",
            type: 'PUT',
            data: JSON.stringify(chips),
            contentType: 'application/json',
            success: function (result) {
                // Do something with the result
            }
        });
    }

    function getRelatedProposals(keyword) {
        $.get("http://localhost:3003/proposals?tag=" + keyword, function (data) {
            createTable(data);
        });
    }

    document.addEventListener('DOMContentLoaded', function () {

        $.get("http://localhost:3003/users/" + localStorage.getItem('user'), function (data) {
            let keywords = data.map((x) => {
                return {tag: x}
            });
            var elems = document.querySelectorAll('.chips');
            allChips = M.Chips.init(elems, {
                onChipSelect: (e, chip) => {
                    getRelatedProposals(chip.childNodes[0].textContent);

                },
                onChipAdd: (e, chip) => {
                    updateChips();
                },
                onChipDelete: (e, chip) => {
                    updateChips()
                },
                data: keywords
            });
        });


    });

    $('.chips-placeholder').chips({
        placeholder: 'Paraules',
        secondaryPlaceholder: '+Paraula',
    });

    function createTable(items) {

        const loadTable = (proposals) => {
            var data = proposals.map((proposal) => {
                return [
                    proposal.id,
                    proposal.title,
                    proposal.proposer,
                    proposal.keywords.join(', '),
                    TFGFinder.Util.translateState(proposal.state)
                ]
            });

            if (table) {
                table.destroy();
            }
            table = $('#test-table').DataTable({
                data: data,
                columns: [
                    {title: "Id"},
                    {title: "T&iacute;tol"},
                    {title: "Proposat per"},
                    {title: "Paraules clau"},
                    {title: "Estat"}
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
                const data = table.row(this).data();
                const proposalId = data[0];
                window.location.href = '/proposals/' + proposalId;
            });
        };
        loadTable(items);
    }

})();