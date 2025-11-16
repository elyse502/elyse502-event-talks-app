const talksData = /* TALKS_DATA_PLACEHOLDER */;

document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule');
    const searchInput = document.getElementById('searchInput');

    const scheduleLayout = [
        { time: '10:00 AM - 11:00 AM', talkIndex: 0 },
        { time: '11:10 AM - 12:10 PM', talkIndex: 1 },
        { time: '12:20 PM - 01:20 PM', talkIndex: 2 },
        { time: '01:20 PM - 02:20 PM', type: 'break', title: 'Lunch Break' },
        { time: '02:20 PM - 03:20 PM', talkIndex: 3 },
        { time: '03:30 PM - 04:30 PM', talkIndex: 4 },
        { time: '04:40 PM - 05:40 PM', talkIndex: 5 },
    ];

    const renderSchedule = (filter = '') => {
        scheduleContainer.innerHTML = '';
        const filterLower = filter.toLowerCase();

        scheduleLayout.forEach(item => {
            const talk = item.talkIndex !== undefined ? talksData.talks[item.talkIndex] : null;

            if (item.type === 'break') {
                const breakEl = document.createElement('div');
                breakEl.className = 'schedule-item break';
                breakEl.innerHTML = `
                    <div class="time">${item.time}</div>
                    <h2>${item.title}</h2>
                `;
                scheduleContainer.appendChild(breakEl);
                return;
            }
            
            if (talk) {
                const categories = talk.category.map(c => c.toLowerCase());
                if (filterLower && !categories.some(c => c.includes(filterLower))) {
                    return;
                }

                const talkEl = document.createElement('div');
                talkEl.className = 'schedule-item';
                talkEl.innerHTML = `
                    <div class="time">${item.time}</div>
                    <h2>${talk.title}</h2>
                    <div class="speakers">By: ${talk.speakers.join(', ')}</div>
                    <p>${talk.description}</p>
                    <div class="categories">
                        ${talk.category.map(cat => `<span class="category">${cat}</span>`).join('')}
                    </div>
                `;
                scheduleContainer.appendChild(talkEl);
            }
        });
    };

    searchInput.addEventListener('input', (e) => {
        renderSchedule(e.target.value);
    });

    renderSchedule();
});
