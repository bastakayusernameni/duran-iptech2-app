import { StyleSheet } from "react-native";

// Enhanced Styles for Instagram-like UI
export const styles = StyleSheet.create({
  // Main container styling
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },

  // Header Styling
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  logo: {
    justifyContent: "center",
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  search: {
    borderRadius: 25,
    padding: 8,
    width: 200,
    backgroundColor: "#f2f2f2",
    fontSize: 14,
    paddingLeft: 15,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  // Feed and Post Section Styling
  feed: {
    flex: 1,
    marginRight: 10,
    marginLeft: 5,
  },
  post: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    overflow: "hidden", // Makes sure images are clipped nicely
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  postHeader: {
    padding: 12,
    backgroundColor: "#f4f4f4",
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  postImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover", // Ensures the image covers the full width
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  caption: {
    padding: 10,
    fontSize: 14,
    color: "#333",
  },

  // Sidebar Styling
  sidebar: {
    width: 100,
    marginTop: 10,
    marginLeft: 10,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  suggestion: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
    paddingVertical: 5,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  suggestionText: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonFollow: {
    padding: 5,
    backgroundColor: "#0095f6",
    color: "#fff",
    borderRadius: 20,
    fontSize: 12,
  },
});