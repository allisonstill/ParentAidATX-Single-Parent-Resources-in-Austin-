# cs373-spring-2025-group-17
# Project Name: ParentAidATX
**Support for Single Parents in Austin, Simplified.**  
ParentAidATX is a website that helps single parents in Austin, Texas get information on family-related government assistance, affordable nearby housing, and childcare centers.

**Website Link:** https://www.parentaidatx.me	or https://parentaidatx.me

**API Documentation Link:** "https://documenter.getpostman.com/view/42442568/2sAYdZstBv" (Still updating)


## Team Members
- Andrew Harvey / @aharvey502
- Rubi Rojas / @rubirojas
- Allison Still / @allisonstill
- Amna Ali / @a-amna-a
- Ethan Yu

## Data Sources
- [Google Maps API](https://developers.google.com/maps) (RESTful) - For affordable  housing and Childcare Centers

- [Yelp API](https://www.yelp.com/search?find_desc=Affordable+Child+care&find_loc=Austin%2C+TX) (RESTful) - Reviews for Child Care Options and Affordable Housing

- [Texas Department of Housing and Community Affairs: Single Family Programs](https://www.tdhca.texas.gov/programs/single-family-programs) – Web scrape for government single-family programs in Texas

- [Texas Health and Human Services Child Care](https://childcare.hhs.texas.gov/Public/ChildCareSearch) - Scrape to collect data on childcare programs across the state

- [Comprehensive Affordable Housing Directory](https://data.austintexas.gov/Housing-and-Real-Estate/Comprehensive-Affordable-Housing-Directory/4syj-z4ky/about_data) - Consistently updated API providing Affordable Housing within the city of Austin

- [Zillow API](https://www.zillowgroup.com/developers/) - For affordable housing

- [Apartment Finder API](https://api.apartments.com/v1) - For affordable housing

## Team Information: 

### Phase 1: 

- Git SHA: 

- Phase Leader(s): 

- Phase Leader Responsibilities:

| Team Member | Estimate Time | Actual Time |
| ----- | --- | --- | 
| Andrew Harvey     |    hours |    hours |
| Rubi Rojas        |    hours |    hours |
| Allison Still     |    hours |    hours |
| Amna Ali          |    hours |    hours |
| Ethan Yu          |    hours |    hours |


## Models  

### 1. Government Programs  
- **Instances:** ~50  

#### **Attributes:**  
- Program ID  
- Program Name
- Government Administration/Department  
- Description  
- Application Link  

#### **Media:**  
  - Links
  - Text descriptions of programs  
  - Government department image  

#### **Connections to Other Models:**  
- **Housing:** Displays local programs based on location  
- **Affordable Childcare:** Government programs realted to childcare  



### 2. Housing  
- **Instances:** ~1000  

#### **Attributes:**  
- Location  
- Cost/Rate  
- Rating  
- Reviews  
- Style of Housing (Apartment, Condo, House)  
#### **Media:**  
  - Google Maps for location
  - Location Image
  - Text description of location, cost, and type of housing
  - User Reviews  

#### **Connections to Other Models:**  
- **Government Programs:** Government programs pertaining to housing  
- **Affordable Childcare:** Displays affordable housing near the location of schools/daycares  


### 3. Affordable Childcare  
- **Instances:** ~8000  

#### **Attributes:**  
- Name  
- Type of Childcare (Daycare, Afterschool, etc.)  
- Cost  
- Quality Rating  
- Age Range of Children  
#### **Media:**
  - Google Maps for location 
  - Image of Childcare Location  
  - Link to Childcare Website  

#### **Connections to Other Models:**  
- **Government Programs:** Childcare provided by government programs  
- **Housing:** Affordable housing near the location of schools/daycare  


## Questions Our Website Will Answer  

- What single-parent government programs am I eligible to apply for?  
- Where can I find affordable housing near my child's daycare or school?  
- What are the best-rated childcare centers that fit my budget?  
- What government assistance is available for housing and childcare in Austin?  
