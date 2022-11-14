export async function fillTheForm(page){

    await page.locator('[name="shipping[firstname]"]').fill('Test')
    await page.locator('[name="shipping[lastname]"]').fill('Test')
    await page.locator('[name="shipping[address1]"]').fill('Test')
    await page.locator('[name="shipping[city]"]').fill('Test')
    await page.locator('[name="shipping[postal_code]"]').fill('Test')
    await page.locator('[name="shipping[email]"]').fill('test@test.com')
    await page.locator('[name="shipping[phone]"]').fill('+421900000000')
    await page.locator('[name="agree_with_terms"]').check()
}
