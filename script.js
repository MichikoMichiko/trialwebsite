$(document).ready(function () {
    // Menu Click Event
    $('.menu a[data-menu]').on('click', function (e) {
        e.preventDefault(); // Prevents page reload

        var menu = $(this).data('menu');

        // Remove active class from all menu items
        $('.menu a.active').removeClass('active');
        $(this).addClass('active');

        // Hide all pages and show the selected one
        $('.page.active').removeClass('active');
        $('.page[data-page="' + menu + '"]').addClass('active');
    });

    // Dialog Box (Logout Confirmation)
    $('body').on('click', '[data-dialog]', function () {
        var action = $(this).data('dialog');
        if (action === 'logout') {
            $('.dialog').toggleClass('active');
        }
    });

    // Close Dialog Box
    $('body').on('click', '[data-dialog-action]', function () {
        var action = $(this).data('dialog-action');
        if (action === 'cancel') {
            $(this).closest('.dialog.active').toggleClass('active');
        }
    });

    // Graph Update Function
    function updateGraph(data) {
        $('.graph .bar[data-day]').each(function () {
            var day = $(this).data('day');
            var barH = $(this).height();
            $(this).find('.bar-content').css('height', (barH / 100) * data[day] + 'px');
        });
    }

    // Add User to Table
    function addUserToTable(data) {
        var table = $('.users-table');
        var ele = `
            <div class="users-item">
                <div class="table-item noflex">${data.id}</div>
                <div class="table-item">${data.email}</div>
                <div class="table-item">${data.username}</div>
                <div class="table-item">${data.nickname}</div>
                <div class="table-item">${data.premium ? "Active" : "Inactive"}</div>
                <div class="table-item">${data.premium ? "Premium" : "Not Premium"}
                    <div class="user-edit-controls">
                        <a href="#" class="table-edit-button">Edit</a>
                    </div>
                </div>
            </div>
        `;
        table.append(ele);
    }

    // Sample Graph Data
    var tempData = {
        sunday: 40,
        monday: 50,
        tuesday: 30,
        wednesday: 20,
        thursday: 30,
        friday: 60,
        saturday: 90
    };

    // Sample User Data
    var users = [
        { id: 0, email: "suzannenixon@medicroix.com", username: "Rosemarie45", nickname: "Mildred11", active: true, premium: false },
        { id: 10, email: "mildrednixon@medicroix.com", username: "Lorrie24", nickname: "Warren15", active: false, premium: true },
        { id: 20, email: "warrennixon@medicroix.com", username: "Celina35", nickname: "Beck16", active: false, premium: false },
        { id: 30, email: "becknixon@medicroix.com", username: "Simone18", nickname: "Tonia12", active: false, premium: true },
        { id: 40, email: "tonianixon@medicroix.com", username: "Alejandra31", nickname: "Eileen42", active: true, premium: false },
        { id: 50, email: "eileennixon@medicroix.com", username: "Ofelia4", nickname: "Walsh36", active: true, premium: true },
        { id: 60, email: "walshnixon@medicroix.com", username: "Owen24", nickname: "Mayra0", active: false, premium: true },
        { id: 70, email: "mayranixon@medicroix.com", username: "Tamra8", nickname: "Graham9", active: false, premium: true },
        { id: 80, email: "grahamnixon@medicroix.com", username: "Dejesus44", nickname: "Russo5", active: false, premium: false }
    ];

    // Add Sample Users to Table
    $.each(users, function (i, item) {
        addUserToTable(users[i]);
    });

    // Update Graph
    updateGraph(tempData);

    // Toggle User Selection
    $('body').on('click', '.users-item:not(.header)', function () {
        $(this).toggleClass('active');
    });

    // User Edit Button
    $('body').on('click', '.users-item a.table-edit-button', function (e) {
        e.preventDefault();
        $(this).closest('.grid').toggleClass('edit-users');
        $(this).closest('.users-item').toggleClass('active');
    });

    // Close User Edit Panel
    $('body').on('click', '.user-edit .header .close', function (e) {
        e.preventDefault();
        $(this).closest('.grid').toggleClass('edit-users');
        $(this).closest('.users-item').toggleClass('active');
    });
	document.addEventListener("DOMContentLoaded", function () {
    const pages = document.querySelectorAll(".page");

    function changeBackground() {
        pages.forEach((page) => {
            if (page.classList.contains("active")) {
                const pageType = page.getAttribute("data-page");
                document.body.style.backgroundImage = `url('${pageType}-bg.jpg')`;
            }
        });
    }

    // Run when switching pages
    document.addEventListener("click", function (event) {
        if (event.target.matches(".menu a")) {
            pages.forEach((page) => page.classList.remove("active"));
            const newPage = document.querySelector(`.page[data-page="${event.target.dataset.page}"]`);
            if (newPage) {
                newPage.classList.add("active");
                changeBackground();
            }
        }
    });

    // Initial background load
    changeBackground();
});

});
