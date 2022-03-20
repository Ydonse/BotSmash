
let allServers = [];
//on parse les users
//si nouveau client alors on créé l'objet par défaut et on le rajoute au tableau d'objets
const isNewUser =  function (user, usersTab){
    if (usersTab.includes(user))
        return false;
    return true;

};

const setBanStageDefault = function(user, usersTab) {
    usersTab[user].smashObj = new SmashObj();
}

const setDefaultSettings = function (user, usersTab) {
    setBanStageDefault(user, usersTab);
}

const addNewUser = function(user, usersTab) {
    usersTab.push(user);
    setDefaultSettings();

};

const parseUser = function(user, usersTab) {
    if (isNewUser(user, usersTab))
        addNewUser();
};