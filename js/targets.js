export class TargetApplications {
  constructor() {
    this.targets = {
      'vulnerable-blog': {
        name: 'Vulnerable Blog',
        difficulty: 'Beginner',
        description: 'A simple blog application with basic security flaws',
        vulnerabilities: ['SQL Injection', 'XSS', 'Weak Authentication'],
        url: '/targets/blog.html'
      },
      'e-commerce': {
        name: 'E-Commerce Site',
        difficulty: 'Intermediate',
        description: 'Online shopping platform with payment processing',
        vulnerabilities: ['CSRF', 'Session Management', 'Price Manipulation'],
        url: '/targets/ecommerce.html'
      },
      'banking-app': {
        name: 'Banking Application',
        difficulty: 'Advanced',
        description: 'Secure banking interface with multiple protection layers',
        vulnerabilities: ['Advanced Authentication Bypass', 'Race Conditions', 'Business Logic Flaws'],
        url: '/targets/banking.html'
      },
      'api-server': {
        name: 'REST API Server',
        difficulty: 'Intermediate',
        description: 'RESTful API with various endpoints and authentication',
        vulnerabilities: ['API Injection', 'Broken Authentication', 'Excessive Data Exposure'],
        url: '/targets/api.html'
      },
      'social-network': {
        name: 'Social Network',
        difficulty: 'Advanced',
        description: 'Social media platform with user interactions',
        vulnerabilities: ['Stored XSS', 'IDOR', 'Privacy Violations'],
        url: '/targets/social.html'
      }
    };
    
    this.currentTarget = null;
  }

  init() {
    // Initialize target applications
    this.setupTargetModal();
  }

  setupTargetModal() {
    const modal = document.getElementById('target-modal');
    const closeBtn = document.getElementById('close-target');
    
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    });
  }

  getAvailableTargets() {
    return Object.values(this.targets);
  }

  loadTarget(targetName) {
    const target = this.targets[targetName];
    if (!target) {
      return false;
    }
    
    this.currentTarget = target;
    this.showTargetApplication(target);
    return true;
  }

  showTargetApplication(target) {
    const modal = document.getElementById('target-modal');
    const content = document.getElementById('target-content');
    
    // Generate target application HTML based on type
    content.innerHTML = this.generateTargetHTML(target);
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  generateTargetHTML(target) {
    switch (target.name) {
      case 'Vulnerable Blog':
        return this.generateBlogHTML();
      case 'E-Commerce Site':
        return this.generateECommerceHTML();
      case 'Banking Application':
        return this.generateBankingHTML();
      case 'REST API Server':
        return this.generateAPIHTML();
      case 'Social Network':
        return this.generateSocialHTML();
      default:
        return '<p>Target application not implemented yet.</p>';
    }
  }

  generateBlogHTML() {
    return `
      <div class="bg-white text-gray-800 min-h-96">
        <header class="bg-blue-600 text-white p-4">
          <h1 class="text-2xl font-bold">SecureBlog</h1>
          <nav class="mt-2">
            <a href="#" class="mr-4 hover:underline">Home</a>
            <a href="#" class="mr-4 hover:underline">Posts</a>
            <a href="#" class="mr-4 hover:underline">Login</a>
          </nav>
        </header>
        
        <main class="p-6">
          <div class="mb-6">
            <h2 class="text-xl font-semibold mb-2">Welcome to SecureBlog</h2>
            <p class="text-gray-600">A simple blogging platform for security testing</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="border rounded p-4">
              <h3 class="font-semibold mb-2">Login</h3>
              <form class="space-y-3">
                <input type="text" placeholder="Username" class="w-full p-2 border rounded">
                <input type="password" placeholder="Password" class="w-full p-2 border rounded">
                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Login</button>
              </form>
            </div>
            
            <div class="border rounded p-4">
              <h3 class="font-semibold mb-2">Search Posts</h3>
              <form class="space-y-3">
                <input type="text" placeholder="Search..." class="w-full p-2 border rounded">
                <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Search</button>
              </form>
            </div>
          </div>
          
          <div class="mt-6">
            <h3 class="font-semibold mb-3">Recent Posts</h3>
            <div class="space-y-3">
              <div class="border-l-4 border-blue-500 pl-4">
                <h4 class="font-medium">Getting Started with Web Security</h4>
                <p class="text-sm text-gray-600">Learn the basics of web application security...</p>
              </div>
              <div class="border-l-4 border-green-500 pl-4">
                <h4 class="font-medium">Common Vulnerabilities Explained</h4>
                <p class="text-sm text-gray-600">Understanding OWASP Top 10 vulnerabilities...</p>
              </div>
            </div>
          </div>
        </main>
        
        <div class="bg-gray-100 p-4 text-center text-sm text-gray-600">
          <p>🎯 Target: Look for SQL injection in login form and XSS in search functionality</p>
        </div>
      </div>
    `;
  }

  generateECommerceHTML() {
    return `
      <div class="bg-white text-gray-800 min-h-96">
        <header class="bg-purple-600 text-white p-4">
          <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold">ShopSecure</h1>
            <div class="flex items-center space-x-4">
              <span>Cart (2)</span>
              <button class="bg-purple-700 px-3 py-1 rounded">Login</button>
            </div>
          </div>
        </header>
        
        <main class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="md:col-span-2">
              <h2 class="text-xl font-semibold mb-4">Featured Products</h2>
              <div class="grid grid-cols-2 gap-4">
                <div class="border rounded p-4">
                  <div class="bg-gray-200 h-32 mb-2 rounded"></div>
                  <h3 class="font-medium">Security Book</h3>
                  <p class="text-green-600 font-bold">$29.99</p>
                  <button class="bg-blue-600 text-white px-3 py-1 rounded mt-2">Add to Cart</button>
                </div>
                <div class="border rounded p-4">
                  <div class="bg-gray-200 h-32 mb-2 rounded"></div>
                  <h3 class="font-medium">Hacking Course</h3>
                  <p class="text-green-600 font-bold">$99.99</p>
                  <button class="bg-blue-600 text-white px-3 py-1 rounded mt-2">Add to Cart</button>
                </div>
              </div>
            </div>
            
            <div class="border rounded p-4">
              <h3 class="font-semibold mb-3">Quick Checkout</h3>
              <form class="space-y-3">
                <input type="text" placeholder="Card Number" class="w-full p-2 border rounded">
                <input type="text" placeholder="Expiry (MM/YY)" class="w-full p-2 border rounded">
                <input type="text" placeholder="CVV" class="w-full p-2 border rounded">
                <input type="hidden" name="amount" value="129.98">
                <button type="submit" class="bg-green-600 text-white w-full py-2 rounded">Pay $129.98</button>
              </form>
            </div>
          </div>
        </main>
        
        <div class="bg-gray-100 p-4 text-center text-sm text-gray-600">
          <p>🎯 Target: Look for CSRF in checkout, price manipulation, and session issues</p>
        </div>
      </div>
    `;
  }

  generateBankingHTML() {
    return `
      <div class="bg-white text-gray-800 min-h-96">
        <header class="bg-green-700 text-white p-4">
          <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold">SecureBank</h1>
            <div class="text-sm">
              <span>Session: 15:00 remaining</span>
            </div>
          </div>
        </header>
        
        <main class="p-6">
          <div class="bg-yellow-100 border border-yellow-400 p-3 rounded mb-6">
            <p class="text-sm">⚠️ For security, please verify your identity before proceeding</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="border rounded p-4">
              <h3 class="font-semibold mb-3">Account Login</h3>
              <form class="space-y-3">
                <input type="text" placeholder="Account Number" class="w-full p-2 border rounded">
                <input type="password" placeholder="PIN" class="w-full p-2 border rounded">
                <input type="text" placeholder="Security Code" class="w-full p-2 border rounded">
                <button type="submit" class="bg-green-700 text-white w-full py-2 rounded">Secure Login</button>
              </form>
            </div>
            
            <div class="border rounded p-4">
              <h3 class="font-semibold mb-3">Quick Transfer</h3>
              <form class="space-y-3">
                <input type="text" placeholder="To Account" class="w-full p-2 border rounded">
                <input type="number" placeholder="Amount" class="w-full p-2 border rounded">
                <input type="text" placeholder="Reference" class="w-full p-2 border rounded">
                <button type="submit" class="bg-blue-600 text-white w-full py-2 rounded">Transfer</button>
              </form>
            </div>
          </div>
          
          <div class="mt-6 border rounded p-4">
            <h3 class="font-semibold mb-3">Account Summary</h3>
            <div class="grid grid-cols-3 gap-4 text-center">
              <div>
                <p class="text-2xl font-bold text-green-600">$5,432.10</p>
                <p class="text-sm text-gray-600">Checking</p>
              </div>
              <div>
                <p class="text-2xl font-bold text-blue-600">$12,890.45</p>
                <p class="text-sm text-gray-600">Savings</p>
              </div>
              <div>
                <p class="text-2xl font-bold text-purple-600">$2,100.00</p>
                <p class="text-sm text-gray-600">Credit Available</p>
              </div>
            </div>
          </div>
        </main>
        
        <div class="bg-gray-100 p-4 text-center text-sm text-gray-600">
          <p>🎯 Target: Advanced authentication bypass, race conditions in transfers, business logic flaws</p>
        </div>
      </div>
    `;
  }

  generateAPIHTML() {
    return `
      <div class="bg-gray-900 text-green-400 font-mono min-h-96 p-4">
        <div class="mb-4">
          <h1 class="text-xl font-bold">API Security Testing Interface</h1>
          <p class="text-sm text-gray-400">Test various API endpoints for security vulnerabilities</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-gray-800 p-4 rounded">
            <h3 class="font-semibold mb-3">Available Endpoints</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-blue-400">GET /api/users</span>
                <span class="text-yellow-400">Auth Required</span>
              </div>
              <div class="flex justify-between">
                <span class="text-green-400">POST /api/login</span>
                <span class="text-gray-400">Public</span>
              </div>
              <div class="flex justify-between">
                <span class="text-purple-400">PUT /api/users/{id}</span>
                <span class="text-red-400">Admin Only</span>
              </div>
              <div class="flex justify-between">
                <span class="text-blue-400">GET /api/orders</span>
                <span class="text-yellow-400">Auth Required</span>
              </div>
              <div class="flex justify-between">
                <span class="text-orange-400">DELETE /api/users/{id}</span>
                <span class="text-red-400">Admin Only</span>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-800 p-4 rounded">
            <h3 class="font-semibold mb-3">API Tester</h3>
            <form class="space-y-3">
              <select class="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white">
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
              </select>
              <input type="text" placeholder="/api/endpoint" class="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white">
              <textarea placeholder="Request Body (JSON)" class="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white h-20"></textarea>
              <button type="submit" class="bg-green-600 text-white w-full py-2 rounded">Send Request</button>
            </form>
          </div>
        </div>
        
        <div class="mt-4 bg-gray-800 p-4 rounded">
          <h3 class="font-semibold mb-2">Response</h3>
          <pre class="text-xs text-gray-300 bg-black p-3 rounded overflow-x-auto">
{
  "status": "success",
  "data": {
    "users": [
      {"id": 1, "username": "admin", "role": "administrator"},
      {"id": 2, "username": "user1", "role": "user"},
      {"id": 3, "username": "guest", "role": "guest"}
    ]
  },
  "meta": {
    "total": 3,
    "page": 1
  }
}
          </pre>
        </div>
        
        <div class="mt-4 bg-yellow-900 border border-yellow-600 p-3 rounded">
          <p class="text-yellow-200 text-sm">🎯 Target: Test for API injection, broken authentication, IDOR, and excessive data exposure</p>
        </div>
      </div>
    `;
  }

  generateSocialHTML() {
    return `
      <div class="bg-white text-gray-800 min-h-96">
        <header class="bg-blue-500 text-white p-4">
          <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold">SocialSecure</h1>
            <div class="flex items-center space-x-4">
              <span>👤 John Doe</span>
              <button class="bg-blue-600 px-3 py-1 rounded">Settings</button>
            </div>
          </div>
        </header>
        
        <main class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="md:col-span-2 space-y-4">
              <div class="border rounded p-4">
                <h3 class="font-semibold mb-3">Create Post</h3>
                <textarea placeholder="What's on your mind?" class="w-full p-3 border rounded h-20"></textarea>
                <div class="flex justify-between items-center mt-3">
                  <div class="flex space-x-2">
                    <button class="text-blue-500">📷 Photo</button>
                    <button class="text-green-500">📍 Location</button>
                  </div>
                  <button class="bg-blue-500 text-white px-4 py-2 rounded">Post</button>
                </div>
              </div>
              
              <div class="space-y-4">
                <div class="border rounded p-4">
                  <div class="flex items-center mb-3">
                    <div class="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                    <div>
                      <p class="font-semibold">Alice Smith</p>
                      <p class="text-sm text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <p class="mb-3">Just learned about web security! 🔒 #cybersecurity</p>
                  <div class="flex space-x-4 text-sm text-gray-500">
                    <button class="hover:text-blue-500">👍 Like (12)</button>
                    <button class="hover:text-blue-500">💬 Comment (3)</button>
                    <button class="hover:text-blue-500">🔄 Share</button>
                  </div>
                </div>
                
                <div class="border rounded p-4">
                  <div class="flex items-center mb-3">
                    <div class="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                    <div>
                      <p class="font-semibold">Bob Johnson</p>
                      <p class="text-sm text-gray-500">5 hours ago</p>
                    </div>
                  </div>
                  <p class="mb-3">Check out this cool security tool I found: <script>alert('XSS')</script></p>
                  <div class="flex space-x-4 text-sm text-gray-500">
                    <button class="hover:text-blue-500">👍 Like (8)</button>
                    <button class="hover:text-blue-500">💬 Comment (1)</button>
                    <button class="hover:text-blue-500">🔄 Share</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="space-y-4">
              <div class="border rounded p-4">
                <h3 class="font-semibold mb-3">Profile</h3>
                <div class="text-center">
                  <div class="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2"></div>
                  <p class="font-semibold">John Doe</p>
                  <p class="text-sm text-gray-500">Security Enthusiast</p>
                  <button class="bg-blue-500 text-white px-3 py-1 rounded mt-2 text-sm">Edit Profile</button>
                </div>
              </div>
              
              <div class="border rounded p-4">
                <h3 class="font-semibold mb-3">Friends</h3>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                    <span class="text-sm">Alice Smith</span>
                  </div>
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                    <span class="text-sm">Bob Johnson</span>
                  </div>
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                    <span class="text-sm">Carol White</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <div class="bg-gray-100 p-4 text-center text-sm text-gray-600">
          <p>🎯 Target: Look for stored XSS in posts, IDOR in profile access, and privacy violations</p>
        </div>
      </div>
    `;
  }
}