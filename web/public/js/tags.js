(() => {

    let allChips;

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

    document.addEventListener('DOMContentLoaded', function () {

        $.get("http://localhost:3003/users/" + localStorage.getItem('user'), function (data) {
            let keywords = data.map((x) => { return {tag: x}});
            var elems = document.querySelectorAll('.chips');
            allChips = M.Chips.init(elems, {
                onChipSelect: (e, chip) => {
                    console.log(chip.childNodes[0].textContent)
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
})();