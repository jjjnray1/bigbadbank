function Withdraw() {
  const [amount, setAmount] = React.useState("");
  const [error, setError] = React.useState("");
  const ctx = React.useContext(UserContext);

  const handleAmountChange = (event) => {
    const value = event.target.value;
    setAmount(value);
    setError("");
  };

  const handleWithdrawClick = () => {
    if (isNaN(amount)) {
      setError("Please enter a valid number.");
    } else if (Number(amount) <= 0) {
      setError("Please enter a positive number.");
    } else if (Number(amount) > ctx.users[0].balance) {
      setError("Account overdraft: Not enough balance.");
    } else {
      const newBalance = ctx.users[0].balance - Number(amount);
      ctx.users[0].balance = newBalance;
      alert(`Withdraw of $${amount} is successful!`);
      setAmount("");
    }
  };

  return (
    <Card
      bgcolor="primary"
      txtcolor="white"
      header="Withdraw"
      title={`Balance: $${ctx.users[0].balance.toLocaleString()}`}
      body={
        <>
          <form>
            <div className="form-group">
              <label htmlFor="amountInput">Amount:</label>
              <input
                type="text"
                className="form-control"
                id="amountInput"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
            <button
              type="button"
              className="btn btn-light"
              onClick={handleWithdrawClick}
              disabled={!amount}
            >
              Withdraw
            </button>
            {error && (
              <div className="mt-3 alert alert-danger">{error}</div>
            )}
          </form>
        </>
      }
    />
  );
}