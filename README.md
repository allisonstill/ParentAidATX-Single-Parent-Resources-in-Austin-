# cs373-spring-2025-group-17
# Project Name: ParentAidATX
**Support for Single Parents in Austin, Simplified.**  
ParentAidATX is a website that helps single parents in Austin, Texas get information on family-related books, affordable nearby housing, and childcare centers.

**Website Link:** https://www.parentaidatx.me	or https://parentaidatx.me

**API Documentation Link:** https://documenter.getpostman.com/view/42442568/2sAYdZstBv

**API Link:** https://flask-api-production-730f.up.railway.app/

## Team Members
- Andrew Harvey / @aharvey502
- Rubi Rojas / @rubirojas
- Allison Still / @allisonstill
- Amna Ali / @a-amna-a
- Ethan Yu / @ethany04

## Data Sources
- [Google Books API](https://developers.google.com/books) (RESTful) - For Books
- [Brightwheel](https://mybrightwheel.com/search/austin) (Web scrape)- For the best daycares and childcare centers in Austn
- [Google Maps API](https://developers.google.com/maps) (RESTful) - For map media, affordable housing in Austin, and location of Childcare Centers

Other potential sources:
- [Yelp API](https://www.yelp.com/search?find_desc=Affordable+Child+care&find_loc=Austin%2C+TX) (RESTful) - Reviews for Child Care Options and Affordable Housing

- [Texas Department of Housing and Community Affairs: Single Family Programs](https://www.tdhca.texas.gov/programs/single-family-programs) – Web scrape for government single-family programs in Texas

- [Texas Health and Human Services Child Care](https://childcare.hhs.texas.gov/Public/ChildCareSearch) - Scrape to collect data on childcare programs across the state

- [Comprehensive Affordable Housing Directory](https://data.austintexas.gov/Housing-and-Real-Estate/Comprehensive-Affordable-Housing-Directory/4syj-z4ky/about_data) - Consistently updated API providing Affordable Housing within the city of Austin

- [Zillow API](https://www.zillowgroup.com/developers/) - For affordable housing

- [Apartment Finder API](https://api.apartments.com/v1) - For affordable housing

## Team Information: 

### Phase 1: 

- Git SHA: a029ea67a9ae5d055facd1d5aef37b3b755d9d85

- Phase Leader(s): Andrew Harvey

- Phase Leader Responsibilities: Team Coordination, set meeting times, lead React app frontend, deploy on AWS

| Team Member | Estimate Time | Actual Time |
| ----- | --- | --- | 
| Andrew Harvey     |    8 hours  |    10 hours |
| Rubi Rojas        |    10 hours |    11 hours |
| Allison Still     |    12 hours |    10 hours |
| Amna Ali          |    14 hours |    10 hours |
| Ethan Yu          |    13 hours |    10 hours |

### Phase 2: 

- Git SHA: 

- Phase Leader(s): 

- Phase Leader Responsibilities: 

| Team Member | Estimate Time | Actual Time |
| ----- | --- | --- | 
| Andrew Harvey     |      hours  |       hours |
| Rubi Rojas        |  25   hours |  33   hours |
| Allison Still     |  24   hours |  32   hours |
| Amna Ali          |       hours |       hours |
| Ethan Yu          |       hours |       hours |


## Models  

### 1. Books  
- **Instances:** ~100 

#### **Attributes:**  
- Author
- Date of Publication
- Page Count 
- Price
- Category (Parenting, Childcare, or Housing related)
- Description
- Link to Purchase Book

#### **Media:**  
  - Links
  - Text descriptions of book  
  - Book cover image  

#### **Connections to Other Models:**  
- **Housing:** Displays local programs based on location  
- **Affordable Childcare:** Books related to childcare  



### 2. Housing  
- **Instances:** ~1000  

#### **Attributes:**  
- Name
- Cost/Rate  
- Rating  
- Reviews  
- Address
- Zip Code
- Style of Housing (Apartment, Condo, House)  
- Crime Level
- Nearby Park
- Transportation

#### **Media:**  
  - Google Maps for location
  - Location Image
  - Text description of location, cost, and type of housing
  - User Reviews  

#### **Connections to Other Models:**  
- **Books:** Books pertaining to housing  
- **Affordable Childcare:** Displays affordable housing near the location of schools/daycares  


### 3. Affordable Childcare  
- **Instances:** ~8000  

#### **Attributes:**  
- Name
- Age Range
- Open Time
- Close Time
- Program Type
- Address

#### **Media:**
  - Google Maps for location 
  - Image of childcare center
  - Link to childcare center's website  

#### **Connections to Other Models:**  
- **Books:** Childcare related books
- **Housing:** Affordable housing near the location of schools/daycare


## Questions Our Website Will Answer  

- What are some helpful books for single-parenting?
- Where can I find affordable housing near my child's daycare or school?
- What are the best childcare centers that fit my preferred times and style of education for my child?
- What books are available for housing and childcare?
