Untitled::Application.routes.draw do

  get "groups/index"
  get "parts/index"
  get "series/index"
  get "bodies/index"
  get "models/index"

  match 'models/:sid/:bid' => 'models#find_by_sid_bid'
  match 'prodcodes/:mid/:bid/:sid/:region' => 'prodcodes#find_by_sid_bid_mid_reg'
  match 'prodcodedates/:pid' => 'prodcodedates#find_by_pid'
  match 'subgroups/:gid/:sid' => 'subgroups#find_by_gid_sid'
  match 'subgroups/:gid' => 'subgroups#find_by_gid'

  match 'parts/:id' => 'parts#show'
  match 'find' => 'parts#search'
  match 'groups/:id' => 'groups#show'


  resources :catalog, only: [:index, :show]

  resources :cart, only: [:index]
  match 'cart' => 'cart#update', :via => :put, :as => 'cart_update'
  match 'cart' => 'cart#create', :via => :post, :as => 'cart'
  match 'cart/:id' => 'cart#destroy', :via => :delete, :as => 'cart_destroy'

  match 'catalog/order' => 'catalog#order', :via => :post, :as => 'catalog_order'

\
  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
