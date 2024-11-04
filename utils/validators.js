function isValidEmail (email) {
    const emailRegex = /^[a-zA-Z0-9][^\s@]*@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword (password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

module.exports = {
    isValidEmail,
    isValidPassword
}
