import Customer from "../models/customerModel.js";

async function get(req, res, next) {
  Customer.findAll()
    .then((customers) => {
      res.json(customers);
    })
    .catch((err) => {
      console.error(`Error fetching users: ${err}`);
      res.code(500).json({ error: err });
    });
}

async function create(req, res, next) {
  const customer = req.body;
  if (!customer || !customer.firstName || !customer.lastName) {
    res.code(400).json({ error: "Incomplete or invalid customer data" });
  }

  Customer.create(customer)
    .then((customer) => {
      res.json({ message: "Customer created", customer: customer });
    })
    .catch((err) => {
      res.code(500).json({ error: err });
    });
}

async function remove(req, res, next) {
  const customerId = req.params.id;

  Customer.findByPk(customerId)
    .then((customer) => {
      if (!customer) {
        res.code(404).json({ error: "Customer not found" });
      } else {
        return customer.destroy();
      }
    })
    .then(() => {
      res
        .status(200)
        .json({ message: `Customer with Id: ${customerId} deleted` });
    })
    .catch((err) => {
      console.error(`Error while deleting customer: ${err}`);
      res.status(500).json({ error: err });
    });
}

export { get, create };
