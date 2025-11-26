import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, Button, Grid, Box, Rating, TextField, Select, MenuItem, InputLabel, FormControl, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { encryptData, decryptData } from "../security/cryptoUtils.js"; // Import the library functions
import { LockPerson } from "@mui/icons-material";
// import ShineBorder from "../main/ShineBorder.jsx"; // 🛑 REMOVED ShineBorder
import { set } from "date-fns";

const CourseSelectionPage = ({sessionRef}) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("none"); // Sort by: 'none', 'rating', 'date'
  const [sortOrder, setSortOrder] = useState("desc"); // Ascending or Descending order
  const [filterBy, setFilterBy] = useState("all"); // Filter by category
  const [filterByRating, setFilterByRating] = useState(0); // Filter by rating
  const [userDesignation, setUserDesignation] = useState("");
  const navigate = useNavigate();


      const role = sessionRef?.current?.user.role || null; 
    const designation = sessionRef?.current?.user?.designation || null; 
useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/courses");
        console.log(res.data);

        const coursesArray = Object.entries(res.data).map(([courseId, courseDetails]) => ({
          id: courseId,
          ...courseDetails,
          // ✅ FIX: डेटा को संख्या में बदलें, यदि यह मौजूद है
          rating: parseFloat(courseDetails.rating) || 0,
        }));

        setCourses(coursesArray);
        setFilteredCourses(coursesArray);
      } catch (error) {
        console.error("Error fetching courses", error);
      }
    };
    fetchCourses();
    setUserDesignation(designation || "");
  }, []);

  // Function to handle course selection
  const handleCourseSelection = async (courseId, courseCategory) => {
    const userId = decryptData(localStorage.getItem("uid"));
    if (!userId) {
      console.error("User ID is not defined");
      return;
    }

    const subrolesArray = userDesignation.split(",").map(role => role.trim());
    if (subrolesArray.includes("admin") || subrolesArray.includes(courseCategory)) {
      try {
      // Send both userId and courseId to the backend
      const res = await axios.post("http://localhost:5000/courses/select", { userId, courseId });
      console.log(res.data); // Log success message from backend
      setSelectedCourse(courseId);
      navigate(`/course/${courseId}`); // Navigate to the course page dynamically
    } catch (error) {
      console.error("Error selecting course", error);
    }
  } else {
    console.log("Access Denied: User's subrole does not match course category");
    // You can show a message or a lock icon here instead of navigation
  }
  };

  // Function to handle search functionality
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to apply filters and sorting to the courses
  const applyFiltersAndSort = () => {
    let filtered = [...courses];
  
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    // Filter by category (filterBy)
    if (filterBy !== "all") {
      filtered = filtered.filter((course) => course.category === filterBy);
    }
  
    // Filter by rating (filterByRating)
    if (filterByRating > 0) {
      filtered = filtered.filter((course) => course.rating >= filterByRating);
    }
  
    // Sort by selected criterion
    if (sortBy === "rating") {
      filtered = filtered.sort((a, b) => (sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating));
    } else if (sortBy === "date") {
      filtered = filtered.sort((a, b) => (sortOrder === "asc" ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)));
    }
  
    setFilteredCourses(filtered);
  };
  

  // Function to reset filters and sorting
  const resetFilters = () => {
    setSearchQuery("");
    setSortBy("none");
    setSortOrder("desc");
    setFilterBy("all");
    setFilterByRating(0);
    setFilteredCourses(courses); // Reset the courses to the original list
  };

  // Function to generate a random color
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // useEffect to reapply filters and sorting when any relevant state changes
  useEffect(() => {
    applyFiltersAndSort();
  }, [searchQuery, sortBy, filterBy, filterByRating, sortOrder, courses]);

  return (
    <div>
      {/* Search Bar - Fixed to MUI Card styling */}
      <Card 
            sx={{
             pt:2,
             pb:0,
             pr:2,
             pl:2,
             height:'100px',
             // Beautiful Shadow and Hover effect for Search Bar
             transition: 'all 0.3s ease-in-out',
             boxShadow: 8, // Deep initial shadow
             borderRadius: '8px', 
             '&:hover': { 
                boxShadow: 15, // Deeper shadow on hover
                transform: 'translateY(-2px)' // Slight lift on hover
             }
            }}
          >
      <Box sx={{  display: "flex", justifyContent:"flex-start" }}>
        <TextField
          label="Search Courses"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          sx={{ width: "50%" }}
        />
    
        <FormControl sx={{ margin: "0px 20px", width: "10%" }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            label="Sort By"
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="date">Date</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ marginRight: 2, width: "10%" }}>
          <InputLabel>Sort Order</InputLabel>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            label="Sort Order"
          >
            <MenuItem value="desc">Descending</MenuItem>
            <MenuItem value="asc">Ascending</MenuItem>
          </Select>
        </FormControl>


        <FormControl sx={{ marginRight: 2, width: "10%" }}>
  <InputLabel>Filter By Rating</InputLabel>
  <Select
    value={filterByRating}
    onChange={(e) => setFilterByRating(e.target.value)}
    label="Filter By Rating"
  >
    <MenuItem value={0}>All Ratings</MenuItem>
    <MenuItem value={1}>1 Star & above</MenuItem>
    <MenuItem value={2}>2 Stars & above</MenuItem>
    <MenuItem value={3}>3 Stars & above</MenuItem>
    <MenuItem value={4}>4 Stars & above</MenuItem>
    <MenuItem value={5}>5 Stars</MenuItem>
  </Select>
</FormControl>


        {/* Reset Button */}
        <Button
          variant="outlined"
          color="secondary"
          onClick={resetFilters}
          sx={{ alignSelf: "center", width: "8%", height:"50px" }}
        >
          Reset
        </Button>
      </Box>
      </Card>
     

      <Grid container spacing={4} sx={{display: "flex", justifyContent:"flex-start", mt: 2}}> {/* Adjusted spacing for better layout */}
        {Array.isArray(filteredCourses) && filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}> {/* Increased Grid size for better card visibility */}
              <Card
                 sx={{
                    // Beautiful Shadow and Hover effect for Course Cards
                    transition: 'all 0.3s ease-in-out',
                    boxShadow: 5, // Default medium shadow
                    borderRadius: '12px',
                    height: '100%', // Ensure cards are the same height in the grid item
                    '&:hover': {
                      boxShadow: 10, // Enhanced shadow on hover
                      transform: 'translateY(-5px) scale(1.02)', // Lift and slight scale on hover
                      cursor: 'pointer'
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: 'rgba(255,255,255,0.98)',
                  }}
              >
             
                <CardMedia
                  component="img"
                  alt={course.name}
                  height="200"
                  image={course.image || "https://via.placeholder.com/300"} // Placeholder image if course image is not available
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{flexGrow: 1}}>
                  <Typography variant="h6" sx={{fontSize:'1rem'}} gutterBottom>
                    {course.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" noWrap>
                    {course.description}
                  </Typography>

                  {/* Writer Section */}
                  <Box sx={{ margin: "20px 0px" }}>
                    <Typography variant="body2" color="textSecondary">
                     <b> Instructor :</b> {course.writer || "N/A"}
                    </Typography>
                  </Box>

                  {/* Random Colorful Divider Before Rating */}
                  <Box
                    sx={{
                      height: "5px",
                      background: generateRandomColor(), // Apply random color
                      margin: "5px 0"
                    }}
                  ></Box>
            
                </CardContent>

                <Box sx={{ padding: '0 16px 16px 16px' }}> {/* Box outside CardContent for bottom aligned elements */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                    {userDesignation.split(",").map(role => role.trim()).includes("admin") || 
                   userDesignation.split(",").map(role => role.trim()).includes(course.category) ? (
                  
                                    <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleCourseSelection(course.id, course.category)}
                    sx={{ width: "100%" }}
                  >
                    Enroll Now
                  </Button>
                ) : (
                  <Button
      variant="contained"
      color="primary"
      startIcon={<LockPerson />}  // Add the lock icon to the button
      disabled // Disable the button if the user can't access the course
      sx={{ width: "100%" }}
    >
      Enroll Now
    </Button>
                  )}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', margin:'0.5rem 0'}}>

                {/* Star Rating Section */}
                <Box>
                  {/* parseFloat() का उपयोग करें और fallback के लिए 0 प्रदान करें */}
                  <Rating 
                    name="course-rating" 
                    value={parseFloat(course.rating) || 0} 
                    precision={0.5} 
                    readOnly 
                  />
                </Box>
                {/* Date Section */}
                <Box >
                  <Typography variant="body2" color="textSecondary">
                {course.date || "N/A"}
                  </Typography>
                </Box>
                </Box>
              </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary" align="center" sx={{mt: 5, width: '100%'}}>
            No courses available
          </Typography>
        )}
      </Grid>
     
    </div>
  );
};

export default CourseSelectionPage;