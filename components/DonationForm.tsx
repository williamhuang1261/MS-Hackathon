"use client";

const DonationForm = () => {

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    alert("Donation submitted!");
    // Technically go to the payment page -> confirmation + CRM
  }

  return (
    <form className="flex flex-col outline" onSubmit={onSubmit}>
      {/* Donation form fields go here */}
      <h2 className="font-bold">Donation Form</h2>
      <input type="text" placeholder="First Name" />
      <input type="text" placeholder="Last Name" />
      <input type="email" placeholder="Email" />
      <input type="number" placeholder="Amount" />
      <button type="submit">Donate</button>
    </form>
  );
};

export default DonationForm;
