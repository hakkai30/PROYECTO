// Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
    public class Item
    {
        public int id { get; set; }
        public string name { get; set; }
        public string ki { get; set; }
        public string maxKi { get; set; }
        public string race { get; set; }
        public string gender { get; set; }
        public string description { get; set; }
        public string image { get; set; }
        public string affiliation { get; set; }
        public object deletedAt { get; set; }
    }

    public class Links
    {
        public string first { get; set; }
        public string previous { get; set; }
        public string next { get; set; }
        public string last { get; set; }
    }

    public class Meta
    {
        public int totalItems { get; set; }
        public int itemCount { get; set; }
        public int itemsPerPage { get; set; }
        public int totalPages { get; set; }
        public int currentPage { get; set; }
    }

    public class Root
    {
        public List<Item> items { get; set; }
        public Meta meta { get; set; }
        public Links links { get; set; }
    }

