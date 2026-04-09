const items = [
  "Aqiqah Kambing",
  "Qurban Domba",
  "Proses Higienis",
  "Kesehatan 100% Terjamin",
  "#GembalaDariJoya",
  "#HappyWithJoya",
];

const Ticker = () => (
  <div className="bg-lime overflow-hidden py-3">
    <div className="animate-ticker flex whitespace-nowrap">
      {[...items, ...items].map((item, i) => (
        <span
          key={i}
          className="mx-6 text-sm md:text-base font-semibold text-lime-foreground"
        >
          {item} •
        </span>
      ))}
    </div>
  </div>
);

export default Ticker;
