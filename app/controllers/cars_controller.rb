class CarsController < ApplicationController
  before_action :set_car, only: %i[ show edit update destroy ]

  # GET /cars or /cars.json
  def index
    @user_role_id = current_user.role_id

    logger.info("User role id is --- #{@user_role_id}")


    if @user_role_id == 2 || @user_role_id == 3 #role of vendors
      @cars = Car.joins("
        INNER JOIN car_types ON car_types.id = cars.car_type_id
        INNER JOIN fuel_types ON fuel_types.id = cars.fuel_type_id
        INNER JOIN car_colours ON car_colours.id = cars.colour_id
        INNER JOIN car_bodies ON car_bodies.id = cars.body_type_id
        INNER JOIN car_transmissions ON car_transmissions.id = cars.transmission_type_id
        INNER JOIN car_makes ON car_makes.id = cars.make_id
        INNER JOIN car_models ON car_models.id = cars.model_id
        INNER JOIN car_drives ON car_drives.id = cars.drive_type
        INNER JOIN car_cylinders ON car_cylinders.id = cars.car_cylinder
        INNER JOIN car_documents ON car_documents.id = cars.car_doc_id
        INNER JOIN car_engines ON car_engines.id = cars.car_engine_id
        INNER JOIN vehicle_types ON vehicle_types.id = cars.vehicle_type_id
        INNER JOIN users ON users.id = cars.car_user_id
        "
      ).select(
        " cars.id, cars.status as car_status, car_types.id as car_type_id, car_types.name as car_type, car_name, car_price, 
          mileage as car_mileage, car_model_year, cars.description as car_description, car_registration_number,
          car_registration_first_date, trim_details, variant_details, cars.seats as car_seat, cars.doors as car_door, 
          cars.comments as comment_on_car, car_keys, car_primary_damage, car_secondary_damage, estimated_retail_price, 
          car_highlights, fuel_types.fuel_type as car_fuel, car_colours.name as car_colour, car_bodies.type_name as car_body,
          car_transmissions.name as car_transmission, car_makes.name as car_make, car_models.name as car_model,
          car_drives.drive_type as car_drive, car_cylinders.cylinder as car_cylinder, car_documents.doc_type as car_doc,
          car_documents.doc_valid as car_doc_valid, car_engines.engine_type as car_engine, vehicle_types.vehicle as vehicle_type, 
          users.role_id as car_user_role, car_user_id as car_posted_user
        "
        ).where("users.role_id = #{@user_role_id}")
    elsif  @user_role_id == 1 #role of admin
      @cars = Car.joins("
        INNER JOIN car_types ON car_types.id = cars.car_type_id
        INNER JOIN fuel_types ON fuel_types.id = cars.fuel_type_id
        INNER JOIN car_colours ON car_colours.id = cars.colour_id
        INNER JOIN car_bodies ON car_bodies.id = cars.body_type_id
        INNER JOIN car_transmissions ON car_transmissions.id = cars.transmission_type_id
        INNER JOIN car_makes ON car_makes.id = cars.make_id
        INNER JOIN car_models ON car_models.id = cars.model_id
        INNER JOIN car_drives ON car_drives.id = cars.drive_type
        INNER JOIN car_cylinders ON car_cylinders.id = cars.car_cylinder
        INNER JOIN car_documents ON car_documents.id = cars.car_doc_id
        INNER JOIN car_engines ON car_engines.id = cars.car_engine_id
        INNER JOIN vehicle_types ON vehicle_types.id = cars.vehicle_type_id
        INNER JOIN users ON users.id = cars.car_user_id
        "
      ).select(
        " cars.id, cars.status as car_status, car_types.id as car_type_id, car_types.name as car_type, car_name, car_price, 
          mileage as car_mileage, car_model_year, cars.description as car_description, car_registration_number,
          car_registration_first_date, trim_details, 
          variant_details, cars.seats as car_seat, cars.doors as car_door, cars.comments as comment_on_car,
          car_keys, car_primary_damage, car_secondary_damage, estimated_retail_price, car_highlights, 
          fuel_types.fuel_type as car_fuel, car_colours.name as car_colour, car_bodies.type_name as car_body,
          car_transmissions.name as car_transmission, car_makes.name as car_make, car_models.name as car_model,
          car_drives.drive_type as car_drive, car_cylinders.cylinder as car_cylinder, car_documents.doc_type as car_doc,
          car_documents.doc_valid as car_doc_valid, car_engines.engine_type as car_engine, vehicle_types.vehicle as vehicle_type, 
          users.role_id as car_user_role,car_user_id as car_posted_user
        "
      )
    end
  end


  def new_user_cars 
    @user_role = current_user.role_id

    logger.info("User role id is --- #{@user_role}")

    if @user_role == 2 || @user_role == 3 #role of vendors
      @cars_user = Car.joins("
        INNER JOIN car_types ON car_types.id = cars.car_type_id
        INNER JOIN fuel_types ON fuel_types.id = cars.fuel_type_id
        INNER JOIN car_colours ON car_colours.id = cars.colour_id
        INNER JOIN car_bodies ON car_bodies.id = cars.body_type_id
        INNER JOIN car_transmissions ON car_transmissions.id = cars.transmission_type_id
        INNER JOIN car_makes ON car_makes.id = cars.make_id
        INNER JOIN car_models ON car_models.id = cars.model_id
        INNER JOIN car_drives ON car_drives.id = cars.drive_type
        INNER JOIN car_cylinders ON car_cylinders.id = cars.car_cylinder
        INNER JOIN car_documents ON car_documents.id = cars.car_doc_id
        INNER JOIN car_engines ON car_engines.id = cars.car_engine_id
        INNER JOIN vehicle_types ON vehicle_types.id = cars.vehicle_type_id
        INNER JOIN users ON users.id = cars.car_user_id
        "
      ).select(
        " cars.id, car_types.id as car_type_id, car_types.name as car_type, car_name, car_price, 
          mileage as car_mileage, car_model_year, cars.description as car_description, car_registration_number,
          car_registration_first_date, trim_details, variant_details, cars.seats as car_seat, cars.doors as car_door, 
          cars.comments as comment_on_car, car_keys, car_primary_damage, car_secondary_damage, estimated_retail_price, 
          car_highlights, fuel_types.fuel_type as car_fuel, car_colours.name as car_colour, car_bodies.type_name as car_body,
          car_transmissions.name as car_transmission, car_makes.name as car_make, car_models.name as car_model,
          car_drives.drive_type as car_drive, car_cylinders.cylinder as car_cylinder, car_documents.doc_type as car_doc,
          car_documents.doc_valid as car_doc_valid, car_engines.engine_type as car_engine, vehicle_types.vehicle as vehicle_type, 
          users.role_id as car_user_role, car_user_id as car_posted_user
        "
        ).where(car_type_id:1, car_user_id: current_user.id).order("id desc")
    elsif  @user_role == 1 #role of admin
      @cars_user = Car.joins("
        INNER JOIN car_types ON car_types.id = cars.car_type_id
        INNER JOIN fuel_types ON fuel_types.id = cars.fuel_type_id
        INNER JOIN car_colours ON car_colours.id = cars.colour_id
        INNER JOIN car_bodies ON car_bodies.id = cars.body_type_id
        INNER JOIN car_transmissions ON car_transmissions.id = cars.transmission_type_id
        INNER JOIN car_makes ON car_makes.id = cars.make_id
        INNER JOIN car_models ON car_models.id = cars.model_id
        INNER JOIN car_drives ON car_drives.id = cars.drive_type
        INNER JOIN car_cylinders ON car_cylinders.id = cars.car_cylinder
        INNER JOIN car_documents ON car_documents.id = cars.car_doc_id
        INNER JOIN car_engines ON car_engines.id = cars.car_engine_id
        INNER JOIN vehicle_types ON vehicle_types.id = cars.vehicle_type_id
        INNER JOIN users ON users.id = cars.car_user_id
        "
      ).select(
        " cars.id, car_types.id as car_type_id, car_types.name as car_type, car_name, car_price, 
          mileage as car_mileage, car_model_year, cars.description as car_description, car_registration_number,
          car_registration_first_date, trim_details, 
          variant_details, cars.seats as car_seat, cars.doors as car_door, cars.comments as comment_on_car,
          car_keys, car_primary_damage, car_secondary_damage, estimated_retail_price, car_highlights, 
          fuel_types.fuel_type as car_fuel, car_colours.name as car_colour, car_bodies.type_name as car_body,
          car_transmissions.name as car_transmission, car_makes.name as car_make, car_models.name as car_model,
          car_drives.drive_type as car_drive, car_cylinders.cylinder as car_cylinder, car_documents.doc_type as car_doc,
          car_documents.doc_valid as car_doc_valid, car_engines.engine_type as car_engine, vehicle_types.vehicle as vehicle_type, 
          users.role_id as car_user_role,car_user_id as car_posted_user
        "
      ).where(car_type_id: "1").order('id desc')
    end
  
  end 


  def used_user_cars 

    user_role = current_user.role_id

    logger.info("User role id is --- #{user_role}")

    logger.info("User id is --- #{current_user.id}")


    if user_role == 2 || user_role == 3 #role of vendors
      @cars_user = Car.joins("
        INNER JOIN car_types ON car_types.id = cars.car_type_id
        INNER JOIN fuel_types ON fuel_types.id = cars.fuel_type_id
        INNER JOIN car_colours ON car_colours.id = cars.colour_id
        INNER JOIN car_bodies ON car_bodies.id = cars.body_type_id
        INNER JOIN car_transmissions ON car_transmissions.id = cars.transmission_type_id
        INNER JOIN car_makes ON car_makes.id = cars.make_id
        INNER JOIN car_models ON car_models.id = cars.model_id
        INNER JOIN car_drives ON car_drives.id = cars.drive_type
        INNER JOIN car_cylinders ON car_cylinders.id = cars.car_cylinder
        INNER JOIN car_documents ON car_documents.id = cars.car_doc_id
        INNER JOIN car_engines ON car_engines.id = cars.car_engine_id
        INNER JOIN vehicle_types ON vehicle_types.id = cars.vehicle_type_id
        INNER JOIN users ON users.id = cars.car_user_id
        "
      ).select(
        " cars.id, car_types.id as car_type_id, car_types.name as car_type, car_name, car_price, 
          mileage as car_mileage, car_model_year, cars.description as car_description, car_registration_number,
          car_registration_first_date, trim_details, variant_details, cars.seats as car_seat, cars.doors as car_door, 
          cars.comments as comment_on_car, car_keys, car_primary_damage, car_secondary_damage, estimated_retail_price, 
          car_highlights, fuel_types.fuel_type as car_fuel, car_colours.name as car_colour, car_bodies.type_name as car_body,
          car_transmissions.name as car_transmission, car_makes.name as car_make, car_models.name as car_model,
          car_drives.drive_type as car_drive, car_cylinders.cylinder as car_cylinder, car_documents.doc_type as car_doc,
          car_documents.doc_valid as car_doc_valid, car_engines.engine_type as car_engine, vehicle_types.vehicle as vehicle_type, 
          users.role_id as car_user_role, car_user_id as car_posted_user
        "
        ).where(car_type_id:2, car_user_id: current_user.id).order("id desc")
    elsif  user_role == 1 #role of admin
      @cars_user = Car.joins("
        INNER JOIN car_types ON car_types.id = cars.car_type_id
        INNER JOIN fuel_types ON fuel_types.id = cars.fuel_type_id
        INNER JOIN car_colours ON car_colours.id = cars.colour_id
        INNER JOIN car_bodies ON car_bodies.id = cars.body_type_id
        INNER JOIN car_transmissions ON car_transmissions.id = cars.transmission_type_id
        INNER JOIN car_makes ON car_makes.id = cars.make_id
        INNER JOIN car_models ON car_models.id = cars.model_id
        INNER JOIN car_drives ON car_drives.id = cars.drive_type
        INNER JOIN car_cylinders ON car_cylinders.id = cars.car_cylinder
        INNER JOIN car_documents ON car_documents.id = cars.car_doc_id
        INNER JOIN car_engines ON car_engines.id = cars.car_engine_id
        INNER JOIN vehicle_types ON vehicle_types.id = cars.vehicle_type_id
        INNER JOIN users ON users.id = cars.car_user_id
        "
      ).select(
        " cars.id, car_types.id as car_type_id, car_types.name as car_type, car_name, car_price, 
          mileage as car_mileage, car_model_year, cars.description as car_description, car_registration_number,
          car_registration_first_date, trim_details, 
          variant_details, cars.seats as car_seat, cars.doors as car_door, cars.comments as comment_on_car,
          car_keys, car_primary_damage, car_secondary_damage, estimated_retail_price, car_highlights, 
          fuel_types.fuel_type as car_fuel, car_colours.name as car_colour, car_bodies.type_name as car_body,
          car_transmissions.name as car_transmission, car_makes.name as car_make, car_models.name as car_model,
          car_drives.drive_type as car_drive, car_cylinders.cylinder as car_cylinder, car_documents.doc_type as car_doc,
          car_documents.doc_valid as car_doc_valid, car_engines.engine_type as car_engine, vehicle_types.vehicle as vehicle_type, 
          users.role_id as car_user_role,car_user_id as car_posted_user
        "
      ).where(car_type_id: 2).order('id desc')
    end
  end 

  # GET /cars/1 or /cars/1.json
  def show    

    @car_on_show = Car.where(id: params[:id])

    logger.info " Car showing -- #{@car_on_show.inspect}"

    car_show_id = @car_on_show[0].id

    logger.info " Car showing id -- #{car_show_id}"
    

    @car_poster_id = @car_on_show[0].car_user_id


    @car = Car.joins("
      INNER JOIN car_types ON car_types.id = cars.car_type_id
      INNER JOIN fuel_types ON fuel_types.id = cars.fuel_type_id
      INNER JOIN users ON users.id = cars.car_user_id
      INNER JOIN car_colours ON car_colours.id = cars.colour_id
      INNER JOIN car_bodies ON car_bodies.id = cars.body_type_id
      INNER JOIN car_transmissions ON car_transmissions.id = cars.transmission_type_id
      INNER JOIN car_makes ON car_makes.id = cars.make_id
      INNER JOIN car_models ON car_models.id = cars.model_id
      INNER JOIN car_drives ON car_drives.id = cars.drive_type
      INNER JOIN car_cylinders ON car_cylinders.id = cars.car_cylinder
      INNER JOIN car_documents ON car_documents.id = cars.car_doc_id
      INNER JOIN car_engines ON car_engines.id = cars.car_engine_id
      INNER JOIN vehicle_types ON vehicle_types.id = cars.vehicle_type_id
      INNER JOIN users as car_displayed_user ON users.id = cars.car_user_id
      "
    ).select(
      "cars.id, cars.status as car_status, car_types.id as car_type_id, car_types.name as car_type_name, car_types.comments as car_type_comments, 
      car_types.status as car_type_status, car_name, car_model_year, car_registration_number, cars.description as car_description, car_highlights, car_user_id, car_secondary_damage, car_primary_damage, car_registration_first_date, 
      car_price, mileage, description, estimated_retail_price, trim_details, derivative_details, variant_details, seats as car_seat, doors as car_door,car_transmissions.name as car_transmission,
      cars.comments as car_comments, car_keys, fuel_types.fuel_type as car_fuel, car_colours.name as car_color, car_bodies.type_name as car_body, car_makes.name as car_make, 
      car_models.name as car_model, car_models.model_date as car_model_date, car_drives.drive_type as car_drive, car_cylinders.cylinder as car_cylinder, car_documents.doc_type as car_doc,
      car_documents.doc_valid as car_doc_valid, car_engines.engine_type as car_engine, vehicle_types.vehicle as vehicle_type, car_displayed_user.username as car_displayed_username, 
      car_displayed_user.email as car_displayed_user_email, car_displayed_user.role_id as car_displayed_user_role_id, car_displayed_user.firstname as car_displayed_user_firstname, 
      car_displayed_user.mobile_number as car_displayed_user_mobile
     
      "
    ).with_attached_images.find(params[:id])


    logger.info "car on show details ::: #{@car_on_show.inspect}"


    logger.info "car on show user id ::: #{@car_poster_id}"

    logger.info "car details -- #{@car.inspect}"

    logger.info "car estimated price -- #{@car.estimated_retail_price}"

    #calculating price to pay of there is discount price from seller noted
    #this is noted as the {estimated_price}
    @estimated_price = @car.estimated_retail_price

    
    if @estimated_price.nil? 

    logger.info " estimated price -------- nil"
    @amount_to_save = 0

    @price_to_pay = @car.car_price #final price to pay

    else 
      logger.info " estimated proce -------- #{@estimated_price}"
      @amount_to_save = @car.car_price.to_f - @car.estimated_retail_price.to_f

      @price_to_pay = @car.estimated_retail_price #final price to pay
    end

    @car_enquiry_id = params[:id]

    logger.info " Car id :::: #{@car_enquiry_id}"


    @enquiry_request = Vehicleenquiry.new

  end



  # GET /cars/new
  def new
    @car = Car.new
  end


  # Make enquiry to create an enquiry for a car
  def make_enquiry
    @enquiry_request = Vehicleenquiry.new

    @car_details_id = params[:id]

    logger.info " car id is ----- #{@car_details_id}"

    @car_details = Car.joins("
      INNER JOIN car_types ON car_types.id = cars.car_type_id
      INNER JOIN fuel_types ON fuel_types.id = cars.fuel_type_id
      INNER JOIN car_colours ON car_colours.id = cars.colour_id
      INNER JOIN car_bodies ON car_bodies.id = cars.body_type_id
      INNER JOIN car_transmissions ON car_transmissions.id = cars.transmission_type_id
      INNER JOIN car_makes ON car_makes.id = cars.make_id
      INNER JOIN car_models ON car_models.id = cars.model_id
      INNER JOIN car_drives ON car_drives.id = cars.drive_type
      INNER JOIN car_cylinders ON car_cylinders.id = cars.car_cylinder
      INNER JOIN car_documents ON car_documents.id = cars.car_doc_id
      INNER JOIN car_engines ON car_engines.id = cars.car_engine_id
      INNER JOIN vehicle_types ON vehicle_types.id = cars.vehicle_type_id
      INNER JOIN users ON users.id = cars.car_user_id
      ").select(
      " cars.id, car_types.id as car_type_id, car_types.name as car_type, car_name, car_price,
        mileage as car_mileage, car_model_year, cars.description as car_description, car_registration_number,
        car_registration_first_date, trim_details, derivative_details, cars.status as car_status,
        variant_details, cars.seats as car_seat, cars.doors as car_door, cars.comments as comment_on_car,
        car_keys, car_primary_damage, car_secondary_damage, estimated_retail_price, car_highlights, 
        fuel_types.fuel_type as car_fuel, car_colours.name as car_colour, car_bodies.type_name as car_body,
        car_transmissions.name as car_transmission, car_makes.name as car_make, car_models.name as car_model,
        car_drives.drive_type as car_drive, car_cylinders.cylinder as car_cylinder, car_documents.doc_type as car_doc,
        car_documents.doc_valid as car_doc_valid, car_engines.engine_type as car_engine, vehicle_types.vehicle as vehicle_type, 
        users.email as car_seller_email, users.username as car_seller_username
      "
    ).where(:id => @car_details_id)
    
    
    
    @car_details = Car.where(:id => @car_details_id)

    logger.info "car details from id :::: #{@car_details.inspect}"

    # logger.info "car seller id :::: #{@car_details[0].car_user_id}"

    

    @seller_id = @car_details[0].car_user_id

    logger.info " car seller id is ----- #{@seller_id}"

    @seller_details = User.where(id: @seller_id)

    logger.info "car seller details from id :::: #{@seller_details.inspect}"

    @seller_username = @seller_details[0].username

    logger.info "car seller details from id 222 :::: #{@seller_username.inspect}"

    logger.info "car seller username:::: #{@seller_username}"

  end 



  # GET /cars/1/edit
  def edit
  end



  # POST /cars or /cars.json
  def create
    @car = Car.new(car_params)

    respond_to do |format|
      if @car.save
        format.html { redirect_to cars_path, notice: "Car was successfully created." }
        format.json { render :show, status: :created, location: @car }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @car.errors, status: :unprocessable_entity }
      end
    end
  end



  # PATCH/PUT /cars/1 or /cars/1.json
  def update
    respond_to do |format|
      if @car.update(car_params)
        format.html { redirect_to @car, notice: "Car was successfully updated." }
        format.json { render :show, status: :ok, location: @car }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @car.errors, status: :unprocessable_entity }
      end
    end
  end



  # DELETE /cars/1 or /cars/1.json
  def destroy
    @car.destroy
    respond_to do |format|
      format.html { redirect_to cars_url, notice: "Car was successfully destroyed." }
      format.json { head :no_content }
    end
  end


  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_car
      @car = Car.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def car_params
      params.require(:car).permit(:car_name, :car_type_id, :car_registration_number, 
        :car_registration_first_date, :car_price, :fuel_type_id, :mileage, :colour_id, :body_type_id, :description, 
        :transmission_type_id, :trim_details, :derivative_details, :make_id, :model_id, :variant_details, :car_cylinder, 
        :drive_type, :car_keys, :car_primary_damage, :car_secondary_damage, :estimated_retail_price, :car_doc_id, :car_user_id, 
        :car_highlights, :car_engine_id, :car_model_year, :seats,:doors, :vehicle_type_id, :status, :comments, images: [])
    end
end
