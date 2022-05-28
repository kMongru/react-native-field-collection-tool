## Research Survey Tool for Western University Researchers

### Project Description
This repository is the mobile frontend of a collection system for research into Ontario mite infestations. 

#### System Users
| Actor | Description |
| ----- | ----------- |
| Grower | A registered Ontario Grower that would like to utilize the services provide by the TSSM Management application. |
| IPM Specialist | Co-investigators and end-users since they act as trusted bilateral knowledge brokers to their sectors and directly link project findings to Growers. They are specialists monitor pest situations through active scouting of crops and make recommendations to growers about integrated pest management. |
| Lab Technician | A person working at Western University that directly interacts and performs required analysis of TSSM samples. Maintains and updates the local server that host the primary database. |
| Environment Canada | A database that holds a collection of climate data for a better understanding of the TSSM environment. |

#### System Use Cases

| Use Case | Description | Status |
| ----- | ----------- | ------ |
| Lab Technicians and Growers Logins | Seperate user flows behind login page to control information security.  | Complete |
| Collect TSSM Samples and Information | Provides the ability for Growers to enter all required information about the sample which will be linked to the barcode of the sample bag. This will include: an image of the hotspot of the TSSM within the greenhouse, timestamp and GPS location, an audio message for additional information, such as prior crop control and a unique Grower Id | Complete |
| Report Issue Screen | During the initial testing an issue reporting screen will be required for colidating issues for the devolpment team to review.  | Complete |
| Register for Clearance | Lab Technicians will be required to create a secure profile request that will be validated by the TSSM Management Admin team. | Lab Side |
| Maintain and Updating Sample Inventory | Provides the ability to scan new barcodes in the lab (plastic bags, test tubes, etc) into the database system along with a optional description. Additional barcode scanning will allow lab technicians to modify and maintain information regarding the barcode. | Lab Side |
| Creating and Storing Barcodes | Provides the ability for lab technicians to print sample bar codes that are automatically stored into the database system.   | Lab Side |


### Screenshots & Demo
<img src="/screenshots/Login Screen.png" width=200vw/> <img src="/screenshots/Home Screen.png" width=200vw /> <img src="/screenshots/Barcode.png" width=200vw /> <img src="/screenshots/Selection Screen.png" width=200vw />



Here's a **[link](https://drive.google.com/file/d/1OZXzRnDZ1_5AE-RaDja-asI5yj0y6Ibb/view)** to a quick walkthrough of the application!

### License
[MIT](https://choosealicense.com/licenses/mit/)
