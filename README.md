## Donation Collection Client

This is a client for the [Donation Collection Server]

## Installation

1. Clone the repository

   ```bash
      git clone https://github.com/RahatRezwan/donation-collection-client.git

   ```

2. User yarn to install the dependencies

   ```bash
      yarn

   ```

3. Create a .env.local file in the root directory and add the following

   ```bash
      VITE_APP_API_BASE_URL=http://localhost:5000/api/v1
      VITE_APP_IMGBB_API_KEY=34cba6cf3b7f2e343a8db9b3d50611ef

   ```

4. Run the development server

   ```bash
      yarn dev

   ```

5. Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## How to use

1. After Start the app and connect with the backend. You need to click login button and then go to register
2. In Register You have to create 1 admin account and 1 donor account.
3. After that you can login with admin or donar account.

## Create Donation

1. To crate donation you have to login with donor account.
2. Then you can create donation from donate today section's donate now button.
3. You can also create donation by clicking in the donate plans section's plan title.

## Dashboard

1. To see the dashboard you have to login with donor or admin account.
2. Donor can see their donations list and they can update or delete the donation.

## Admin Role

1. Admin can see all the donations list and they can update or delete the donation.
2. Admin can also delete donor account.
