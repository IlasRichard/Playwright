import { test, expect } from '@playwright/test';
import { fillTheForm } from './smallMethods';


test.describe('Basic functionality', () => {
  test('Checkout process', async ({ page }) => {
    //Go to the main page and assert you are there.
    await page.goto('http://blackbooks.build.atk.digital/produkty');
    await expect(page).toHaveTitle("BlackBooks - najlepší darček je kniha. Vyberáme knihy podľa nášho vkusu pre deti a dospelých. - Ponuka produktov");
    //Adding item to the cart and asserting we are move there
    const addToCart = await page.locator('[class="product-buy-button btn-add-to-cart3"]').nth(3)
    await addToCart.click()
    await expect(page).toHaveURL("http://blackbooks.build.atk.digital/nakupny-kosik")
    //Need to be discussed if the products will disapper after buying them. 
   // await expect(page.locator('text=Medzisúčet: 11,31 €')).toBeVisible()
    await page.locator('[href="/pokladna"]').click()
    await expect(page).toHaveURL("http://blackbooks.build.atk.digital/pokladna")

    fillTheForm(page)

    await page.locator('//input[@name="shipping_method"][@value="1"]').check()
    await page.locator('//input[@name="payment_method"][@value="4"]').check()
    // confirm order
    await page.locator('[class="xtl-submit xpf btn submit huge b-primary c-page confirm-button"]').click()
    await expect(page).toHaveURL("http://blackbooks.build.atk.digital/pokladna-potvrdenie")

    
    const summary = await page.locator('[class="simple-table"]')
    //Again need to be discussed if there are fixed prices.
    await expect(summary).toContainText("€")
    await page.locator('[class="xtl-submit xpf btn submit huge b-primary c-page"]').click()
    
    await expect(page).toHaveURL("http://blackbooks.build.atk.digital/objednavka")
    const orderFinished = await page.locator('[class="richtext align-center"]')
    await expect(orderFinished).toContainText('Ďakujeme za Vašu objednávku!')
    

  })})





/* test('homepage has title and links to intro page', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);

  // create a locator
  const getStarted = page.getByRole('link', { name: 'Get started' });

  // Expect an attribute "to be strictly equal" to the value.
  await expect(getStarted).toHaveAttribute('href', '/docs/intro');

  // Click the get started link.
  await getStarted.click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});
 */