"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const pages_1 = require("./pages");
const dashboard_1 = require("./pages/dashboard");
function App() {
    return (<react_router_dom_1.BrowserRouter>
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path="/" element={<pages_1.ProtectedRoute>
              <dashboard_1.SharedLayout />
            </pages_1.ProtectedRoute>}>
          <react_router_dom_1.Route index element={<dashboard_1.Stats />}/>
          <react_router_dom_1.Route path="all-jobs" element={<dashboard_1.AllJobs />}/>
          <react_router_dom_1.Route path="add-job" element={<dashboard_1.AddJob />}/>
          <react_router_dom_1.Route path="profile" element={<dashboard_1.Profile />}/>
        </react_router_dom_1.Route>
        <react_router_dom_1.Route path="register" element={<pages_1.Register />}/>
        <react_router_dom_1.Route path="landing" element={<pages_1.Landing />}/>
        <react_router_dom_1.Route path="*" element={<pages_1.Error />}/>
      </react_router_dom_1.Routes>
    </react_router_dom_1.BrowserRouter>);
}
exports.default = App;
