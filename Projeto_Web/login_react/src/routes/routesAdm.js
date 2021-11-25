import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Context } from '../Context/AuthContext';

import { Login } from '../pages/Login';
import { AddUserLogin } from '../pages/AddUserLogin';
import { RecoverPassword } from '../pages/RecoverPassword';
import { UpdatePassword } from '../pages/UpdatePassword';

import { EditUserPassword } from '../pages/EditUserPassword';





import { ListSiteMsgContact } from '../pages/ListSiteMsgContact';
import { ViewSiteMsgContact } from '../pages/ViewSiteMsgContact';
import { AddSiteMsgContact } from '../pages/AddSiteMsgContact';
import { EditSiteMsgContact } from '../pages/EditSiteMsgContact';

function CustomRoute({ isPrivate, ...rest }) {
    const { authenticated } = useContext(Context);

    if (isPrivate && !authenticated) {
        return <Redirect to="/" />
    }
    return <Route { ...rest} />
}

export default function RoutesAdm() {
    return (
        <Switch>
            <CustomRoute exact path="/" component={Login} />
            <CustomRoute exact path="/add-user-login" component={AddUserLogin} />
            <CustomRoute exact path="/recover-password" component={RecoverPassword} />
            <CustomRoute exact path="/update-password/:key" component={UpdatePassword} />

            <CustomRoute exact isPrivate path="/edit-user-password/:id" component={EditUserPassword} />
            

       
            <CustomRoute exact isPrivate path="/list-site-msg-contact" component={ListSiteMsgContact} />
            <CustomRoute exact isPrivate path="/view-site-msg-contact/:id" component={ViewSiteMsgContact} />
            <CustomRoute exact isPrivate path="/add-site-msg-contact" component={AddSiteMsgContact} />
            <CustomRoute exact isPrivate path="/edit-site-msg-contact/:id" component={EditSiteMsgContact} />
        </Switch>
    );
};