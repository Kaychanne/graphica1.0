let currentProject;
let projectsData = [
    {
        id: 0,
        title: 'Project 1',
        likeCount: 0,
        comments: []
    },
    {
        id: 1,
        title: 'Project 2',
        likeCount: 0,
        comments: []
    },
    {
        id: 2,
        title: 'Project 3',
        likeCount: 0,
        comments: []
    },
    {
        id: 3,
        title: 'Project 4',
        likeCount: 0,
        comments: []
    },
    {
        id: 4,
        title: 'Project 5',
        likeCount: 0,
        comments: []
    },
    {
        id: 5,
        title: 'Project 6',
        likeCount: 0,
        comments: []
    },
    {
        id: 6,
        title: 'Project 7',
        likeCount: 0,
        comments: []
    },
    {
        id: 7,
        title: 'Project 8',
        likeCount: 0,
        comments: []
    },
    {
        id: 8,
        title: 'Project 9',
        likeCount: 0,
        comments: []
    },
    {
        id: 9,
        title: 'Project 10',
        likeCount: 0,
        comments: []
    },
    {
        id: 10,
        title: 'Project 11',
        likeCount: 0,
        comments: []
    },
    {
        id: 11,
        title: 'Project 12',
        likeCount: 0,
        comments: []
    },
    {
        id: 12,
        title: 'Project 13',
        likeCount: 0,
        comments: []
    },
    {
        id: 13,
        title: 'Project 14',
        likeCount: 0,
        comments: []
    },
    {
        id: 14,
        title: 'Project 15',
        likeCount: 0,
        comments: []
    },
    {
        id: 15,
        title: 'Project 16',
        likeCount: 0,
        comments: []
    }
];
webkitURL
function showDetails(projectId) {
    currentProject = projectsData.find(project => project.id === projectId);
    const modal = document.getElementById('projectModal');
    const image = document.getElementById('modalImage');
    const title = document.getElementById('projectTitle');
    const description = document.getElementById('projectDescription');

    image.src = `view/assets/project${currentProject.id + 1}.png`; 
    title.textContent = currentProject.title;
    description.textContent = currentProject.description;

    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
}
function nextProject() {
    currentProject = (currentProject + 1) % projectsData.length;
    const image = document.getElementById('modalImage');
    const title = document.getElementById('projectTitle');
    const description = document.getElementById('projectDescription');

    image.src = `view/assets/project${projectsData[currentProject].id + 1}.png`;
    title.textContent = projectsData[currentProject].title;
    description.textContent = projectsData[currentProject].description;
}

function prevProject() {
    currentProject = (currentProject - 1 + projectsData.length) % projectsData.length;
    const image = document.getElementById('modalImage');
    const title = document.getElementById('projectTitle');
    const description = document.getElementById('projectDescription');

    image.src = `view/assets/project${projectsData[currentProject].id + 1}.png`;
    title.textContent = projectsData[currentProject].title;
    description.textContent = projectsData[currentProject].description;
}

function showDetails(projectId) {
    currentProject = projectId;
    const modal = document.getElementById('projectModal');
    const image = document.getElementById('modalImage');
    const title = document.getElementById('projectTitle');
    const description = document.getElementById('projectDescription');

    image.src = `view/assets/project${projectsData[currentProject].id + 1}.png`;
    title.textContent = projectsData[currentProject].title;
    description.textContent = projectsData[currentProject].description;

    modal.style.display = 'block';
}

