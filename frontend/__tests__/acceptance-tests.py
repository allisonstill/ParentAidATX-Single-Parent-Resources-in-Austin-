from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import unittest

# SELENIUM TESTSi


class TestParentAidATX(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")

        service = Service(ChromeDriverManager().install())
        cls.driver = webdriver.Chrome(service=service, options=chrome_options)

        cls.driver.maximize_window()

    def setUp(self):
        self.driver.get("https://www.parentaidatx.me")

    def test_title(self):
        assert "ParentAidATX" in self.driver.title

    def test_nav_bar(self):
        nav = self.driver.find_element(By.CLASS_NAME, "navbar")
        assert nav


    def test_nav_about(self):
        link = self.driver.find_element(By.CSS_SELECTOR, "a[href='/about']")
        self.assertEqual("About", link.get_attribute("innerHTML").strip())
        link.click()
        self.assertEqual(self.driver.current_url, "https://www.parentaidatx.me/about")

    def test_nav_books(self):
        link = self.driver.find_element(By.CSS_SELECTOR,"a[href='/books']")
        self.assertEqual(link.get_attribute("innerHTML").strip(), "Books")
        link.click()
        self.assertTrue(self.driver.current_url.startswith("https://www.parentaidatx.me/books"))


    def test_nav_housing(self):
        link = self.driver.find_element(By.CSS_SELECTOR,"a[href='/housing']")
        self.assertEqual(link.get_attribute("innerHTML").strip(), "Housing")
        link.click()
        self.assertTrue(self.driver.current_url.startswith("https://www.parentaidatx.me/housing"))

    def test_nav_childcare(self):
        link = self.driver.find_element(By.CSS_SELECTOR,"a[href='/childcare']")
        self.assertEqual(link.get_attribute("innerHTML").strip(), "Childcare")
        link.click()
        self.assertTrue(self.driver.current_url.startswith("https://www.parentaidatx.me/childcare"))


    def test_nav_home(self):
        self.assertEqual(self.driver.current_url, "https://www.parentaidatx.me/")
        link = self.driver.find_element(By.CSS_SELECTOR, "a[href='/']")
        link.click()
        self.assertEqual(self.driver.current_url, "https://www.parentaidatx.me/")

    def test_about_page(self):
        self.driver.get("https://www.parentaidatx.me/about")
        members = WebDriverWait(self.driver, 5).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, ".card"))
        )
        self.assertGreaterEqual(len(members), 5, "Not enough team members displayed.")
        first_member = members[0]
        img = first_member.find_element(By.CSS_SELECTOR, ".card-img-top")
        self.assertTrue(img.get_attribute("src"), "Developer image is missing.")
        name = first_member.find_element(By.CSS_SELECTOR, ".card-title").text
        self.assertTrue(name, "Developer name is missing.")
        role = first_member.find_element(By.CSS_SELECTOR, ".card-subtitle").text
        self.assertTrue(role, "Developer role is missing.")
        bio = first_member.find_element(By.CSS_SELECTOR, ".card-text").text
        self.assertTrue(bio, "Developer bio is missing.")
        commit_count = first_member.find_element(By.CSS_SELECTOR, ".gitlab-number").text
        self.assertTrue(commit_count.isdigit(), "Commit count is not a valid number.")
        issues_closed = members[0].find_elements(By.CSS_SELECTOR, ".gitlab-number")[1].text
        self.assertTrue(issues_closed.isdigit(), "Issues closed count is not a valid number.")

        print(f"✅ About Page Test Passed - {len(members)} team members found.")

    def test_books_instance(self):
        self.driver.get("https://www.parentaidatx.me/books?page=1")
        books = WebDriverWait(self.driver, 5).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, ".BookCard"))
        )
        self.assertGreaterEqual(len(books), 3, "Not enough books displayed.")
        first_book = books[0]
        img = first_book.find_element(By.CSS_SELECTOR, ".BookCard-img-top")
        self.assertTrue(img.get_attribute("src"), "Book image is missing.")
        title = first_book.find_element(By.CSS_SELECTOR, ".BookCard-title").text
        self.assertTrue(title, "Book title is missing.")
        view_details_btn = first_book.find_element(By.CSS_SELECTOR, ".custom-btn")
        self.driver.execute_script("arguments[0].scrollIntoView();", view_details_btn)
        WebDriverWait(self.driver, 5).until(EC.element_to_be_clickable(view_details_btn))
        self.driver.execute_script("arguments[0].click();", view_details_btn)
        self.assertTrue(
            "/books/" in self.driver.current_url,
            "Failed to navigate to book details page."
        )
        print(f"✅ Books Page Test Passed - {len(books)} book cards found.")
    
    def test_housing_instance(self):
        self.driver.get("https://www.parentaidatx.me/housing")
        housing_cards = WebDriverWait(self.driver, 5).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, ".HousingCard"))
        )
        self.assertGreaterEqual(len(housing_cards), 3, "Not enough housing options displayed.")
        first_housing = housing_cards[0]
        img = first_housing.find_element(By.CSS_SELECTOR, ".HousingCard-img-top")
        self.assertTrue(img.get_attribute("src"), "Housing image is missing.")
        name = first_housing.find_element(By.CSS_SELECTOR, ".HousingCard-title").text
        self.assertTrue(name, "Housing name is missing.")
        cost = first_housing.find_elements(By.CSS_SELECTOR, ".HousingCard-attributes")[0].text
        self.assertTrue(cost, "Housing cost is missing.")
        rating = first_housing.find_elements(By.CSS_SELECTOR, ".HousingCard-attributes")[1].text
        self.assertTrue(rating, "Housing rating is missing.")
        housing_style = first_housing.find_elements(By.CSS_SELECTOR, ".HousingCard-attributes")[2].text
        self.assertTrue(housing_style, "Housing style is missing.")
        view_details_btn = first_housing.find_element(By.CSS_SELECTOR, ".custom-btn")
        self.driver.execute_script("arguments[0].scrollIntoView();", view_details_btn)
        WebDriverWait(self.driver, 5).until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".custom-btn")))
        self.driver.execute_script("arguments[0].click();", view_details_btn)
        self.assertTrue(
            "/housing/" in self.driver.current_url,
            "Failed to navigate to housing details page."
        )
        print(f"✅ Housing Page Test Passed - {len(housing_cards)} housing cards found.")

    # ... [rest of your imports and class above remains unchanged]

    def test_search_books(self):
        self.driver.get("https://www.parentaidatx.me/books")

        # Wait for search box and type query
        search_box = WebDriverWait(self.driver, 5).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "input.search-box"))
        )
        search_box.send_keys("Championship Fathering")

        # Wait for filtered book cards
        book_cards = WebDriverWait(self.driver, 5).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, ".BookCard"))
        )
        self.assertTrue(len(book_cards) >= 1, "Book search did not return expected results.")
        title = book_cards[0].find_element(By.CLASS_NAME, "BookCard-title").text
        self.assertIn("Championship Fathering", title, "Book title does not match search query.")

        print(f"✅ Book Search Test Passed - Found {len(book_cards)} result(s).")

    def test_search_childcare(self):
        self.driver.get("https://www.parentaidatx.me/childcare")

        # Wait for search box and type query
        search_box = WebDriverWait(self.driver, 5).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "input.search-box"))
        )
        search_box.send_keys("Trillium Montessori")

        # Wait for filtered childcare cards
        child_cards = WebDriverWait(self.driver, 5).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, ".ChildCard"))
        )
        self.assertTrue(len(child_cards) >= 1, "Childcare search did not return expected results.")
        name = child_cards[0].find_element(By.CLASS_NAME, "ChildCard-title").text
        self.assertIn("Trillium Montessori", name, "Childcare name does not match search query.")

        print(f"✅ Childcare Search Test Passed - Found {len(child_cards)} result(s).")


    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()


if __name__ == "__main__":
    unittest.main()
