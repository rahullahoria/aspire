![Logo.png](./assets/Logo.png)
# Aspire App (Debit Card & Set Weekly Limit)

# Business Requirements Document (BRD) for Mobile App

## Introduction
This document outlines the business requirements for the development of a mobile app with specific focus on two core use cases: Debit Card Integration and Weekly Spending Limit Management. These features are designed to enhance the user experience, financial control, and convenience within the app.

## Use Case 1: Debit Card Integration
### Objective
The Debit Card Integration feature aims to allow users to link their debit cards to their app accounts for seamless financial transactions.

### Functional Requirements
1. **Debit Card Linking**
   - Users should be able to link one or more debit cards to their app profile.
   - The app should support major debit card providers and banks.

2. **Secure Authentication**
   - Robust authentication and encryption measures should be in place to ensure the security of users' card details.

3. **Transaction History**
   - Users should have access to a transaction history that displays all debit card transactions made through the app.

4. **Real-time Balance Updates**
   - The app should provide real-time updates on the linked debit card's balance.

5. **Transaction Notifications**
   - Users should receive notifications for each debit card transaction made through the app.

6. **Transaction Categorization**
   - The app should categorize transactions for easy tracking and reporting.

### Non-Functional Requirements
- **Security**: The feature should adhere to industry-standard security protocols to protect user financial data.
- **Performance**: Debit card transactions should be processed efficiently, with minimal latency.
- **Reliability**: The feature should be highly reliable, ensuring accurate transaction records.
- **Data Privacy**: User financial data should be handled with utmost privacy and compliance with data protection regulations.

## Use Case 2: Weekly Spending Limit Management
### Objective
The Weekly Spending Limit Management feature empowers users to set, monitor, and manage their weekly spending limits, promoting responsible financial behavior.

### Functional Requirements
1. **Limit Configuration**
   - Users should be able to set and modify their weekly spending limits within the app.

2. **Spending Notifications**
   - Users should receive notifications when they approach or exceed their weekly spending limits.
   - Notifications should include real-time spending updates.

3. **Spending Insights**
   - The app should provide users with insights into their weekly spending patterns through graphs or reports.

4. **Temporary Overrides**
   - Users should have the option to temporarily override their spending limits for specific transactions.
   - Overrides should require user authentication.

5. **Weekly Limit Reset**
   - Spending limits should reset automatically at the beginning of each week (e.g., Sunday at midnight).
   - Users should be notified of the reset and their new weekly limit.

### Non-Functional Requirements
- **User-Friendly Interface**: The user interface should be intuitive for ease of use.
- **Performance**: The feature should operate efficiently with minimal delay in notifications and updates.
- **Reliability**: Weekly spending limits should be enforced accurately.
- **Data Privacy**: User spending data should be treated confidentially, complying with privacy regulations.

## Conclusion
The Debit Card Integration and Weekly Spending Limit Management features are integral to our mobile app's functionality and user experience. By fulfilling these requirements, we aim to provide a secure, convenient, and empowering financial management tool for our users.

# 4 Key features

1. Show card details
2. Hide card details
3. Disable weekly limit
4. Set card Limit


## Running the App

This is an expo managed project instead of react-native cli project. Primary reason for making this decision is the ease and quickness with which the project could be made up and running and no native code change was involved.
1. Install Node[>12.0] from official website for your development device.
2. Install other pakcages to run expo-cli as per instructions shared [here](https://docs.expo.dev/get-started/installation/])
3. On your terminal go to a folder where you would like to test this project. Execute the following command to initialize a blank repo.

```sh
git init
```

4. Then clone this repository in your initialized repo.
```sh
git clone https://github.com/rahullahoria/aspire.git
```
5. Now run the following commands to set up Node Modules required for the project.

```
npm install
```
6. Start the expo server by typing

```
expo start
```

- This wll start the metro bundler service. 
- Now, to test on `emulator` make sure your environment variables are set up as per recommendations here for 
-- `iOS`(https://docs.expo.dev/workflow/ios-simulator/) 
-- `Android`(https://docs.expo.dev/workflow/android-studio-emulator/)
- To test on `physical devices`, follow the guide as shared [here](https://docs.expo.dev/get-started/installation/#2-expo-go-app-for-ios-and)


> You can generate Android Project folder and iOS xcodeproject by following the 
> instructions [here for iOS](https://docs.expo.dev/bare/hello-world/#ios-configuration) and [here for Android](https://docs.expo.dev/bare/hello-world/#android-configuration)

# Demo Videos

## Android
[![android](https://i.stack.imgur.com/Vp2cE.png)](https://youtu.be/xsFvR0S1Y8g)

## iOS
[![ios](https://i.stack.imgur.com/Vp2cE.png)](https://youtu.be/LyDBvAKCog8)



