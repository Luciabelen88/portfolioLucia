import { Injectable } from '@angular/core';

export interface ProjectType {
  title: String,
  description: String, 
  date: String,
  projectImage: String
  linkGithub: string
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  projectsList : ProjectType[] = [
    {
      title: 'portfolio',
  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard .', 
  date: '2022',
  projectImage: 'https://th.bing.com/th/id/R.1c58dedf7e267353a6d65ae0cb47e846?rik=iuVZ9TLa8bke3w&pid=ImgRaw&r=0',
  linkGithub: 'https://luciabelen88.github.io/'
    },
    {
      title: 'portfolio',
  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard .', 
  date: '2022',
  projectImage: 'https://th.bing.com/th/id/R.1c58dedf7e267353a6d65ae0cb47e846?rik=iuVZ9TLa8bke3w&pid=ImgRaw&r=0',
  linkGithub: 'https://luciabelen88.github.io/'
    },
    {
      title: 'portfolio',
  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard.', 
  date: '2022',
  projectImage: 'https://th.bing.com/th/id/R.1c58dedf7e267353a6d65ae0cb47e846?rik=iuVZ9TLa8bke3w&pid=ImgRaw&r=0',
  linkGithub: 'https://luciabelen88.github.io/'
    },
    {
      title: 'portfolio',
  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard ', 
  date: '2022',
  projectImage: 'https://th.bing.com/th/id/R.1c58dedf7e267353a6d65ae0cb47e846?rik=iuVZ9TLa8bke3w&pid=ImgRaw&r=0',
  linkGithub: 'https://luciabelen88.github.io/'
    }
  ]

  getProject() {
    return this.projectsList;
  }

  constructor() { }
}
