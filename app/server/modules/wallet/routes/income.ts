function income(app: any) {
  app.post('/income', async (req, res) => {
    const income = req.body.income;
    const user = req.body.user;
  });
}

export default income;
