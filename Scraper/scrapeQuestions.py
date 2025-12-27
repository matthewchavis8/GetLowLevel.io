from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json
import time
import os
import re

COOKIES_FILE = "cookies.json"
OUTPUT_FILE = "all_questions.json"

def save_cookies(driver, filename):
    """Save cookies to a file"""
    cookies = driver.get_cookies()
    with open(filename, 'w') as f:
        json.dump(cookies, f, indent=2)
    print(f"💾 Cookies saved to {filename}")

def load_cookies(driver, filename):
    """Load cookies from a file"""
    if os.path.exists(filename):
        with open(filename, 'r') as f:
            cookies = json.load(f)
        for cookie in cookies:
            # Remove domain if it starts with a dot (causes issues)
            if 'domain' in cookie and cookie['domain'].startswith('.'):
                cookie['domain'] = cookie['domain'][1:]
            try:
                driver.add_cookie(cookie)
            except Exception as e:
                pass
        print(f"✅ Cookies loaded from {filename}")
        return True
    return False

def manual_login(driver):
    """Guide user through manual login"""
    print("\n" + "="*60)
    print("🔐 MANUAL LOGIN REQUIRED")
    print("="*60)
    print("\n📋 Instructions:")
    print("1. The browser window has opened")
    print("2. Click 'Login' or 'Sign In' on the website")
    print("3. Log in using your Google account")
    print("4. Once you're logged in and can see your profile/dashboard...")
    print("5. Come back here and press ENTER")
    print("\n⏳ Waiting for you to log in...")
    input("Press ENTER after you've logged in successfully: ")
    print("\n✅ Great! Saving your session...")

def extract_question_urls(driver):
    """Extract all question URLs from the questions list page"""
    print("\n🔍 Extracting question URLs from list page...")
    
    question_urls = []
    
    try:
        # Wait for table to load
        time.sleep(3)
        
        # Find all question links - they typically have the question title as clickable links
        # Try multiple selectors
        links = driver.find_elements(By.XPATH, "//a[contains(@href, '/question/')]")
        
        for link in links:
            url = link.get_attribute('href')
            if url and '/question/' in url and url not in question_urls:
                question_urls.append(url)
        
        print(f"✅ Found {len(question_urls)} question URLs")
        
    except Exception as e:
        print(f"❌ Error extracting URLs: {e}")
    
    return question_urls

def scrape_single_question(driver, url, question_num, total_questions):
    """Scrape a single question"""
    print("\n" + "="*70)
    print(f"📝 QUESTION {question_num}/{total_questions}")
    print("="*70)
    
    question_data = {
        "url": url,
        "title": None,
        "language": None,
        "topic": None,
        "difficulty": None,
        "description": None,
        "options": [],
        "correct_answer": None
    }
    
    try:
        print(f"🌐 Navigating to: {url}")
        driver.get(url)
        time.sleep(3)
        
        # Extract title
        try:
            title = driver.find_element(By.TAG_NAME, "h1").text
            question_data["title"] = title
            print(f"✅ Title: {title}")
        except Exception as e:
            print(f"❌ Could not find title: {e}")
        
        # Extract language from SVG title tag
        try:
            svgs = driver.find_elements(By.TAG_NAME, "svg")
            for i, svg in enumerate(svgs):
                try:
                    svg_html = svg.get_attribute('innerHTML')
                    if svg_html and '<title>' in svg_html:
                        title_match = re.search(r'<title>([^<]+)</title>', svg_html)
                        if title_match:
                            lang_title = title_match.group(1).strip()
                            valid_languages = ["c", "c++", "cpp", "python", "javascript", "java", "rust", "go", "typescript", "ruby", "swift", "csharp"]
                            
                            if lang_title.lower() in valid_languages and not question_data["language"]:
                                if lang_title.lower() == "c":
                                    question_data["language"] = "Cpp"
                                else:
                                    question_data["language"] = lang_title
                                print(f"💻 Language: {question_data['language']}")
                                break
                except:
                    continue
        except Exception as e:
            print(f"⚠️  Could not extract language: {e}")
        
        # Extract difficulty and topic from badges
        try:
            all_elements = driver.find_elements(By.XPATH, "//*[not(self::script) and not(self::style)]")
            difficulty_keywords = ["easy", "medium", "hard"]
            
            for elem in all_elements:
                text = elem.text.strip()
                if not text or len(text) > 50:
                    continue
                
                text_lower = text.lower()
                
                if not question_data["difficulty"] and text_lower in difficulty_keywords:
                    question_data["difficulty"] = text.title()
                    print(f"📊 Difficulty: {question_data['difficulty']}")
                
                if not question_data["topic"] and "knowledge" in text_lower and len(text.split()) <= 4:
                    question_data["topic"] = text
                    print(f"🏷️  Topic: {question_data['topic']}")
        except Exception as e:
            print(f"⚠️  Could not extract metadata: {e}")
        
        # Extract the code block (question description)
        try:
            code_block = driver.find_element(By.CSS_SELECTOR, "code.hljs")
            question_data["description"] = code_block.text
            print(f"✅ Question Code Found ({len(question_data['description'])} chars)")
        except:
            try:
                code_block = driver.find_element(By.TAG_NAME, "code")
                question_data["description"] = code_block.text
                print(f"✅ Question Code Found (alternative)")
            except:
                print("⚠️  No code block found")
        
        # Click "I'm Cooked" button to reveal answer
        try:
            all_buttons = driver.find_elements(By.TAG_NAME, "button")
            button_found = False
            
            for btn in all_buttons:
                btn_text = btn.text.strip().lower()
                if 'cooked' in btn_text:
                    driver.execute_script("arguments[0].scrollIntoView(true);", btn)
                    time.sleep(0.5)
                    btn.click()
                    print("🖱️  Clicked 'I'm Cooked' button")
                    
                    # Wait for answer box
                    wait = WebDriverWait(driver, 10)
                    wait.until(EC.presence_of_element_located((By.XPATH, "//div[contains(@class, 'border-red-500')]")))
                    time.sleep(1)
                    button_found = True
                    break
            
            if not button_found:
                print("⚠️  'I'm Cooked' button not found")
        except Exception as e:
            print(f"⚠️  Error clicking button: {e}")
        
        # Extract multiple choice options
        try:
            all_options = driver.find_elements(By.CSS_SELECTOR, ".text-text-primary")
            noise_keywords = [
                "code", "sign-up", "off", "redemption", "limited",
                "success rate", "%", "first attempt", "merrycrackedmas",
                "discount", "promo", "smash the knowledge"
            ]
            
            if all_options:
                for option in all_options:
                    option_text = option.text.strip()
                    
                    if not option_text:
                        continue
                    
                    is_noise = any(keyword in option_text.lower() for keyword in noise_keywords)
                    if is_noise or len(option_text) > 100:
                        continue
                    
                    if option_text not in question_data["options"]:
                        question_data["options"].append(option_text)
            
            print(f"✅ Found {len(question_data['options'])} answer options")
        except Exception as e:
            print(f"❌ Could not find options: {e}")
        
        # Extract correct answer from red box
        try:
            red_box = driver.find_element(By.XPATH, "//div[contains(@class, 'border-red-500')]")
            correct_h2 = red_box.find_element(By.TAG_NAME, "h2")
            correct_text = correct_h2.text.strip()
            
            if correct_text in question_data["options"]:
                question_data["correct_answer"] = correct_text
                print(f"✅ Correct Answer: {correct_text}")
            else:
                # Short answer or text answer
                question_data["correct_answer"] = correct_text
                print(f"✅ Correct Answer (short): {correct_text}")
        except:
            print("⚠️  Could not find correct answer")
        
    except Exception as e:
        print(f"❌ Error scraping question: {e}")
        import traceback
        traceback.print_exc()
    
    return question_data

# Setup Chrome options
options = webdriver.ChromeOptions()
# Keep browser visible
# options.add_argument("--headless=new")

# Initialize driver
driver = webdriver.Chrome(service=Service(), options=options)

try:
    # First, go to the homepage
    print("🌐 Opening getcracked.io...")
    driver.get("https://getcracked.io")
    time.sleep(2)
    
    # Try to load existing cookies
    cookies_exist = load_cookies(driver, COOKIES_FILE)
    
    if cookies_exist:
        print("🔄 Refreshing page with loaded cookies...")
        driver.refresh()
        time.sleep(3)
    else:
        print("🆕 No saved cookies found. You'll need to log in.")
        manual_login(driver)
        save_cookies(driver, COOKIES_FILE)
    
    # Navigate to questions list page
    questions_list_url = "https://getcracked.io/questions"
    print(f"\n🌐 Navigating to questions list: {questions_list_url}")
    driver.get(questions_list_url)
    time.sleep(5)  # Wait for page to load
    
    # Extract all question URLs
    question_urls = extract_question_urls(driver)
    
    if not question_urls:
        print("❌ No questions found! Check if you're logged in correctly.")
    else:
        print(f"\n🚀 Starting to scrape {len(question_urls)} questions...")
        print("=" * 70)
        
        all_questions = []
        
        # Load existing progress if available
        if os.path.exists(OUTPUT_FILE):
            print(f"📂 Found existing progress file: {OUTPUT_FILE}")
            with open(OUTPUT_FILE, 'r') as f:
                all_questions = json.load(f)
            print(f"✅ Loaded {len(all_questions)} previously scraped questions")
            
            # Skip already scraped URLs
            scraped_urls = {q['url'] for q in all_questions}
            question_urls = [url for url in question_urls if url not in scraped_urls]
            print(f"📋 {len(question_urls)} questions remaining to scrape")
        
        # Scrape each question
        for i, url in enumerate(question_urls, start=1):
            question_data = scrape_single_question(driver, url, i, len(question_urls))
            all_questions.append(question_data)
            
            # Save progress after each question
            with open(OUTPUT_FILE, 'w') as f:
                json.dump(all_questions, f, indent=2)
            print(f"💾 Progress saved ({len(all_questions)} total questions)")
            
            # Small delay between questions to be respectful
            if i < len(question_urls):
                time.sleep(2)
        
        print("\n" + "="*70)
        print("🎉 SCRAPING COMPLETE!")
        print("="*70)
        print(f"✅ Total questions scraped: {len(all_questions)}")
        print(f"💾 Saved to: {OUTPUT_FILE}")
        
        # Print summary stats
        languages = {}
        difficulties = {}
        for q in all_questions:
            lang = q.get('language', 'Unknown')
            diff = q.get('difficulty', 'Unknown')
            languages[lang] = languages.get(lang, 0) + 1
            difficulties[diff] = difficulties.get(diff, 0) + 1
        
        print(f"\n📊 Summary:")
        print(f"   Languages: {dict(languages)}")
        print(f"   Difficulties: {dict(difficulties)}")
    
    print("\n⏸️  Browser will stay open for 10 seconds for inspection...")
    time.sleep(10)
    
except KeyboardInterrupt:
    print("\n⏹️  Interrupted by user")
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
    
finally:
    print("\n🔒 Closing browser...")
    driver.quit()
    print("✅ Done!")
