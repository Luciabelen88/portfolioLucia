import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { ContainerComponent } from './components/container/container.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IntroComponent } from './components/intro/intro.component';
import { AboutComponent } from './components/about/about.component';
import { EducationComponent } from './components/education/education.component';
import { EducationCardComponent } from './components/education-card/education-card.component';
import { ExperienceCardComponent } from './components/experience-card/experience-card.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsCardComponent } from './components/projects-card/projects-card.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsCardComponent } from './components/skills-card/skills-card.component';
import { SectionComponent } from './components/section/section.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- paginación
import { AboutService } from './components/service/about.service';
import { EducationService } from './components/service/education.service';
import { ExperienceService } from './components/service/experience.service';
import { IntroService } from './components/service/intro.service';
import { ProjectsService } from './components/service/projects.service';
import { SkillsService } from './components/service/skills.service';
import { AuthService } from './components/service/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { EditBtnComponent } from './buttons/edit-btn/edit-btn.component';
import { DeleteBtnComponent } from './buttons/delete-btn/delete-btn.component';
import { AddBtnComponent } from './buttons/add-btn/add-btn.component';
import { BackgroundFormComponent } from './form/background-form/background-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EducationAddFormComponent } from './form/education-add-form/education-add-form.component';
import { ProgressBarComponent } from './buttons/progress-bar/progress-bar.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ErrorComponent } from './error/error.component';
import { ExperienceEditFormComponent } from './form/experience-edit-form/experience-edit-form.component';
import { ExperienceAddFormComponent } from './form/experience-add-form/experience-add-form.component';
import { SkillsEditFormComponent } from './form/skills-edit-form/skills-edit-form.component';
import { SkillsAddFormComponent } from './form/skills-add-form/skills-add-form.component';
import { ProjectsEditFormComponent } from './form/projects-edit-form/projects-edit-form.component';
import { ProjectsAddFormComponent } from './form/projects-add-form/projects-add-form.component';
import { AboutmeEditFormComponent } from './form/aboutme-edit-form/aboutme-edit-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SkillsLevelsService } from './components/service/skills_levels.service';
import {MatCardModule} from '@angular/material/card';
import { ImageUploadService } from './components/service/imageUpload.service';
import { SortSkillsBtnComponent } from './buttons/sort-skills-btn/sort-skills-btn.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { FileUploadComponent } from './buttons/file-upload/file-upload.component';
import { FileServiceService } from './file-service/file-service.service';
import { RecaptchaModule } from 'ng-recaptcha';
import { AuthInterceptInterceptor } from './auth-intercept.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HeaderComponent,
    ContainerComponent,
    IntroComponent,
    AboutComponent,
    EducationComponent,
    ExperienceComponent,
    SkillsComponent,
    ProjectsCardComponent,
    ProjectsComponent,
    SkillsCardComponent,
    SectionComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    NotFoundComponent,
    EditBtnComponent,
    DeleteBtnComponent,
    AddBtnComponent,
    BackgroundFormComponent,
    EducationAddFormComponent,
    ProgressBarComponent,
    ErrorComponent,
    ExperienceEditFormComponent,
    ExperienceAddFormComponent,
    SkillsEditFormComponent,
    SkillsAddFormComponent,
    ProjectsEditFormComponent,
    ProjectsAddFormComponent,
    AboutmeEditFormComponent,
    EducationCardComponent,
    ExperienceCardComponent,
    SortSkillsBtnComponent,
    FileUploadComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    FontAwesomeModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatCardModule,
    RecaptchaModule,
    DragDropModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'editauthor', component: AboutmeEditFormComponent },
      
      { path: 'editeducation/:educationId', component: BackgroundFormComponent },
      { path: 'neweducation', component: EducationAddFormComponent },
      { path: 'editexperience/:experienceId', component: ExperienceEditFormComponent },
      { path: 'newexperience', component: ExperienceAddFormComponent },
      { path: 'editSkill/:skillId', component: SkillsEditFormComponent },
      { path: 'newskill', component: SkillsAddFormComponent },
      { path: 'editproject/:projectId', component: ProjectsEditFormComponent },
      { path: 'newproject', component: ProjectsAddFormComponent },

      {path: 'error/:statuscode/:statusdescription', component: ErrorComponent },
      { path: '**', component: NotFoundComponent },
    ]),
    BrowserAnimationsModule,
    
  ],
  providers: [
    AboutService,
    EducationService,
    ExperienceService,
    IntroService,
    ProjectsService,
    SkillsService,
    AuthService,
    SkillsLevelsService,
    ImageUploadService,
    FileServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
