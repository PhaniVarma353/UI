import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyloginComponent } from './myaccount/mylogin/mylogin.component';
import { LogoutComponent } from './myaccount/logout/logout.component';
import { ForgetPasswordComponent } from './myaccount/forget-password/forget-password.component';
import { MybusinessComponent } from './mybusiness/mybusiness.component';
import { MyhomeviewComponent } from './myhomeview/myhomeview.component';
import { HomelayoutComponent } from './homelayout/homelayout.component';
import { ManageRolesComponent } from './myaccount/manage-roles/manage-roles.component';
import { ManageroleAdminComponent } from './myaccount/managerole-admin/managerole-admin.component';
import { ManageroleManagerComponent } from './myaccount/managerole-manager/managerole-manager.component';
import { ManageroleUserComponent } from './myaccount/managerole-user/managerole-user.component';
import { RegistrationformComponent } from './shared/registrationform/registrationform.component';
import { ApplicationAboutusComponent } from './application-details/application-aboutus/application-aboutus.component';
import { ApplicationContactusComponent } from './application-details/application-contactus/application-contactus.component';
import { ApplicationServicesComponent } from './application-details/application-services/application-services.component';
import { ApplicationClientsComponent } from './application-details/application-clients/application-clients.component';
import { MoviesComponent } from './header-two-details/movies/movies.component';
import { SportsComponent } from './header-two-details/sports/sports.component';
import { EventsComponent } from './header-two-details/events/events.component';
import { PlaysComponent } from './header-two-details/plays/plays.component';
import { ActivitiesComponent } from './header-two-details/activities/activities.component';
import { MyaccountComponent } from './myaccount/myaccount/myaccount.component';
import { SettingsComponent } from './myaccount/account-details/settings/settings.component';
import { FaqComponent } from './myaccount/account-details/faq/faq.component';
import { HelpandsupportComponent } from './myaccount/account-details/helpandsupport/helpandsupport.component';
import { HeaderoneComponent } from './common/headerone/headerone.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { ImgcaurouselComponent } from './common/imgcaurousel/imgcaurousel.component';
import { HeadertwoComponent } from './common/headertwo/headertwo.component';
import { ManageroleSuperadminComponent } from './myaccount/managerole-superadmin/managerole-superadmin.component';
import { ProjectpropertiesComponent } from './myaccount/projectproperties/projectproperties.component';
import { accountstatusenum } from './shared/accountstatusenum';
import { userroleenum } from './shared/userroleenum';
import { userroleenumname } from './shared/userroelenumname';

const routes: Routes = [
    {
        path: '',
        component: HomelayoutComponent
    },
    {
        path: 'main',
        component: HomelayoutComponent
    },
    {
        path: 'login',
        component: MyloginComponent
    },
    {
        path: 'aboutus',
        component: ApplicationAboutusComponent
    },
    {
        path: 'contactus',
        component: ApplicationContactusComponent
    },
    {
        path: 'services',
        component: ApplicationServicesComponent
    },
    {
        path: 'clients',
        component: ApplicationClientsComponent
    },
    {
        path: 'activities',
        component: ActivitiesComponent
    },
    {
        path: 'events',
        component: EventsComponent
    },
    {
        path: 'movies',
        component: MoviesComponent
    },
    {
        path: 'plays',
        component: PlaysComponent
    },
    {
        path: 'sports',
        component: SportsComponent
    },
    {
        path: 'mybusiness/:id',
        component: MybusinessComponent
    },
    {
        path: 'myhomeview/:id',
        component: MyhomeviewComponent
    },
    {
        path: 'mybusiness/:id/manageroles',
        component: ManageRolesComponent,
        children: [
            { path: '', redirectTo: 'admin', pathMatch: 'full' },
            { path: 'superadmin', component: ManageroleSuperadminComponent },
            { path: 'admin', component: ManageroleAdminComponent },
            { path: 'manager', component: ManageroleManagerComponent },
            { path: 'user', component: ManageroleUserComponent },
        ]
    },
    {
        path: 'mybusiness/:id/manageproject',
        component: ProjectpropertiesComponent
    },
    {
        path: 'myaccount/:id/manageaccount/:tab',
        component: MyaccountComponent,
        children: [
            { path: '', redirectTo: 'settings', pathMatch: 'full' },
            { path: 'settings', component: SettingsComponent },
            { path: 'helpandsupport', component: HelpandsupportComponent },
            { path: 'faq', component:  FaqComponent},
        ]
    },
    // {
    //     path: 'myaccount/:id/manageaccount/:tab/helpandsupport',
    //     component: HelpandsupportComponent
    // },

];
@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule],
    declarations: []
})
export class AppRoutingModule { }

export const ProjComponents = [
    HeaderComponent,
    FooterComponent,
    MyloginComponent,
    LogoutComponent,
    ForgetPasswordComponent,
    ImgcaurouselComponent,
    MybusinessComponent,
    MyhomeviewComponent,
    HeaderoneComponent,
    HeadertwoComponent,
    HomelayoutComponent,
    ManageRolesComponent,
    ManageroleAdminComponent,
    ManageroleManagerComponent,
    ManageroleUserComponent,
    RegistrationformComponent, 
    ApplicationAboutusComponent,
    ApplicationContactusComponent, 
    ApplicationServicesComponent, 
    ApplicationClientsComponent,
    MoviesComponent,
    SportsComponent,
    EventsComponent,
    PlaysComponent,
    ActivitiesComponent,
    SettingsComponent, 
    HelpandsupportComponent, 
    FaqComponent,
    MyaccountComponent,
    ManageroleSuperadminComponent,
    ProjectpropertiesComponent,
    userroleenumname,
    userroleenum,
    accountstatusenum,
];

