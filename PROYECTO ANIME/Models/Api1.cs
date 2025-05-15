// Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
    public class Item2
    {
        public int id { get; set; }
        public string name { get; set; }
        public bool isDestroyed { get; set; }
        public string description { get; set; }
        public string image { get; set; }
        public object deletedAt { get; set; }
    }

    public class Links2
    {
        public string first { get; set; }
        public string previous { get; set; }
        public string next { get; set; }
        public string last { get; set; }
    }

    public class Meta2
    {
        public int totalItems { get; set; }
        public int itemCount { get; set; }
        public int itemsPerPage { get; set; }
        public int totalPages { get; set; }
        public int currentPage { get; set; }
    }

    public class Root2
    {
        public List<Item> items { get; set; }
        public Meta meta { get; set; }
        public Links links { get; set; }
    }

