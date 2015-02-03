/*
AccountsTemplates.removeField('password');
 
AccountsTemplates.addField({
 _id: 'username_and_email',
 type: 'text',
 displayName: 'Name or Email',
 placeholder: 'name or email',
 });
 */


//Routes
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp', {
  path: '/register'
});
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
//AccountsTemplates.configureRoute('changePwd');
//AccountsTemplates.configureRoute('enrollAccount');
//AccountsTemplates.configureRoute('verifyEmail');


// Options
AccountsTemplates.configure({
    enablePasswordChange: true,
    showForgotPasswordLink: true,
    confirmPassword: true,
    overrideLoginErrors: true,

    negativeFeedback: false,
    positiveFeedback: false,
    negativeValidation: true,
    positiveValidation: true
});

// hack to get signOut route not considered among previous paths
if (Meteor.isClient) {
    Meteor.startup(function(){
        AccountsTemplates.knownRoutes.push('/sign-out');
    });
}

