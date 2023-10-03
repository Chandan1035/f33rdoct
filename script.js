// Get the user's IP address
const getUserIP = async () => {
    return (await fetch('https://api.ipify.org/?format=json')).json();
  };
  
  // Get the user's location from the IP address
  const getUserLocation = async (ip) => {
    return (await fetch(`https://ipapi.co/${ip}/json/?access_key=e5513d053263d0b678a47a0ca4c4a293`)).json();
  };
  
  // Show the user's location on Google Maps
  const showUserLocation = (location) => {
    // Initialize the map
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: {
        lat: location.latitude,
        lng: location.longitude,
      },
    });
  
    // Add a marker to the map
    const marker = new google.maps.Marker({
      position: {
        lat: location.latitude,
        lng: location.longitude,
      },
      map: map,
    });
  };
  
  // Get the time of the user's location
  const getTimeAtLocation = async (timezone) => {
    return (await fetch(`https://worldtimeapi.org/api/timezone/${timezone}`)).json();
  };
  
  // Get the list of post offices in the user's area
  const getPostOffices = async (pincode) => {
    return (await fetch(`https://api.postalpincode.in/pincode/{PINCODE}`)).json();
  };
  
  // Display the list of post offices
  const displayPostOffices = (postOffices) => {
    const list = document.getElementById('post-offices');
    list.innerHTML = '';
  
    postOffices.forEach((postOffice) => {
      const li = document.createElement('li');
      li.textContent = `${postOffice.Name} (${postOffice.BranchType})`;
      list.appendChild(li);
    });
  };
  
  // Filter the list of post offices by name and branch office
  const filterPostOffices = (postOffices, searchTerm) => {
    return postOffices.filter((postOffice) => {
      return postOffice.Name.toLowerCase().includes(searchTerm.toLowerCase()) || postOffice.BranchType.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };
  
  // Initialize the app
  const init = async () => {
    // Get the user's IP address
    const ip = await getUserIP();
  
    // Get the user's location from the IP address
    const location = await getUserLocation(ip);
  
    // Show the user's location on Google Maps
    showUserLocation(location);
  
    // Get the time of the user's location
    const time = await getTimeAtLocation(location.timezone);
  
    // Get the list of post offices in the user's area
    const postOffices = await getPostOffices(location.pincode);
  
    // Display the list of post offices
    displayPostOffices(postOffices);
  
    // Filter the list of post offices by name and branch office
    const filteredPostOffices = filterPostOffices(postOffices, document.getElementById('search').value);
  
    // Display the filtered list of post offices
    displayPostOffices(filteredPostOffices);
  };
  
  // Initialize the app on page load
  window.addEventListener('load', init);
  