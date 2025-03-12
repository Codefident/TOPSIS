# TOPSIS

## What is it?

This is a web app that implements [TOPSIS](https://en.wikipedia.org/wiki/TOPSIS) method. It helps users to make a decision about which alternative they should choose.

The app was created in:

- **Python**, backend
- **React** with **TypeScript**, frontend

## How does the app work?

Let's say that we want to buy a new car, a compact SUV. We're looking at three cars: `A`, `B` and `C`. All of them seem to be pretty cool and it's not easy to decide which one to choose.

In scenarios like this TOPSIS method can help us.

1. Start by **defining criteria** that are important when it comes to buying a car, for example engine power, fuel consumption or purchase price.
❗ *Keep in mind that each criterion must be numerical (fuel consumption in l/100km, price in $ etc.)* ❗

2. More power is better, but bigger purchase price is not really what we want. For features where we aim for lower values remember to **check the checkbox**. It is located right next to each criterion we added. We can do it after we're done entering all the criteria.

3. Then **enter the alternatives**, in this case these are cars `A`, `B`, `C`.

4. After that we can proceed to the next page by pressing *Next*. Here we have to **enter all the values**. Let's say car `A` has following parameters:

    ```json
    {
        "enginePower": 140, // HP
        "consumption": 6, // liters per 100km
        "price": 30000 // $
    }
    ```

    We have to input all of that into the table and then do the same with other cars.

5. For some people economical car is the best one. Others prefer to drive something fast. We can tell which features are more important than others by **specifying the weights** for each criterion. Higher number means higher importance. Default value is `1`.

6. After pressing the button we receive **results** with alternatives ordered from the best to the worst.

## How to run the app?

Requirements:

- Python
- Node.js

To start a **server** go to the `/backend` directory and run:

```cmd
pip install -r requirements.txt
python app.py
```

To start a **client** go to the `/frontend` directory and run:

```cmd
npm install
npm start
```

Then open [localhost:3000](http://localhost:3000) in your browser.
