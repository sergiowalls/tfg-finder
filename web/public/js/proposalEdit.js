(() => {

    const proposalId = parseInt(window.location.pathname.split("/")[2]);

    const dataAccess = TFGFinder.Util.getDataAccess('Api');
    dataAccess.getProposalById(proposalId)
        .then(proposal => {
            setTimeout(() => {
                if (window.formLoaded) {
                    let itemsId = 0;
                    $('#title').val(proposal.title).focus();
                    $('#description').val(proposal.description).focus();

                    let itemId = itemsId++;
                    proposal.goals.forEach(goal => {
                        let newItem = '<li id="' + itemId + '" class="collection-item"><div>' + goal +
                            '<a href="#" class="secondary-content"><i class="material-icons waves-effect" onclick="removeGoal(' +
                            itemId + ')">delete</i></a></div></li>';
                        $('#goals').append(newItem);
                        window.goals.push(goal);
                        itemId++;
                    });

                    let keywords = proposal.keywords.map((x) => {
                        window.keywords.push(x);
                        return {tag: x}
                    });
                    var elems = document.querySelectorAll('.chips');
                    var instances = M.Chips.init(elems, {
                        onChipAdd: (e, chip) => {
                            window.keywords.push(chip.childNodes[0].textContent);
                        },
                        onChipDelete: (e, chip) => {
                            window.keywords.splice( window.keywords.indexOf(chip.childNodes[0].textContent), 1 );
                        },
                        data: keywords
                    });

                }
            }, 100)

        });

})();