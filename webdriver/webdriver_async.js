const { Builder, By, Capabilities, until } = require("selenium-webdriver");

function createDriver() {
    let driver = new Builder()
        .usingServer('http://localhost:4444/wd/hub')
        .withCapabilities(Capabilities.chrome())
        .build();
    driver.manage().setTimeouts({
        script: 10000
    });
    return driver;
}

let browser = createDriver();

function handleFailure(err) {
    console.error('Something went wrong\n', err.stack, '\n');
    closeBrowser();
}

function closeBrowser() {
    browser.quit();
}

let emailValue = 'test@email.com';
let passwordValue = '123456';

browser.get('https://wiggle.co.uk/')
    .then(() => browser.findElement(By.id('accountLink')).click())
    .then(() => browser.wait(until.titleContains('Wiggle Customer Services'), 5000))
    .then(() => browser.findElement(By.css('#DualRegisterEmailModel_Email')).sendKeys(emailValue))
    .then(() => browser.findElement(By.css('#qa-dual-register')).click())
    .then(() => browser.findElement(By.id('RegisterModel_EmailConfirm')).sendKeys(emailValue))
    .then(() => browser.findElement(By.id('RegisterModel_Password')).sendKeys(passwordValue))
    .then(() => browser.findElement(By.id('RegisterModel_FirstName')).sendKeys('Test'))
    .then(() => browser.findElement(By.id('RegisterModel_Surname')).sendKeys('User'))
    .then(() => browser.findElement(By.xpath("//button[@type='submit']")).click())
    .then(() => browser.findElements(By.className('bem-navigation-menu__list-link')))
    .then(menuItems => menuItems[2].click())
    .then(() => browser.findElement(By.css('.bem-area-category-tile--main')).click())
    .then(() => browser.findElement(By.css('.bem-product-thumb__image-link--grid')).click())
    .then(() => browser.sleep(3000))    
    .then(closeBrowser, handleFailure);
