class CarsController < ApplicationController
  before_action :set_car, only: %i[ show edit update destroy ]

  # GET /cars or /cars.json
  def index
    @cars = Car.joins("INNER JOIN car_types ON car_types.id = cars.car_type_id
      INNER JOIN car_makes ON car_makes.id = cars.make_id
      INNER JOIN car_models ON car_models.id = cars.model_id
      INNER JOIN car_bodies ON car_bodies.id = cars.body_type_id
      INNER JOIN fuel_types ON fuel_types.id = cars.fuel_type_id
      INNER JOIN car_transmissions ON car_transmissions.id = cars.transmission_type_id
      INNER JOIN car_colours ON car_colours.id = cars.colour_id
      INNER JOIN car_drives ON car_drives.id = cars.drive_type
      INNER JOIN car_documents ON car_documents.id = cars.car_doc_id
      INNER JOIN car_engines ON car_engines.id = cars.car_engine_id
      INNER JOIN car_cylinders ON car_cylinders.id = cars.car_cylinder
      INNER JOIN vehicletypes ON vehicletypes.id = cars.vehicle_type_id").select(
      " cars.id,car_types.id, car_models.id, car_makes.id, car_colours.id, car_bodies.id, car_drives.id, car_documents.id,
        car_cylinders.id, fuel_types.id, car_transmissions.id, vehicletypes.id, cars.car_engine_id, cars.car_name as car_name, 
        cars.car_registration_number as registration_number,cars.car_registration_first_date as registration_date, 
        cars.car_model_year as car_model_year, cars.car_highlights as car_highlights, cars.car_price as car_price, 
        cars.mileage as car_mileage, cars.estimated_retail_price as estimated_retail_price, 
        cars.car_primary_damage as primary_damage, cars.car_secondary_damage as secondary_damage,
        cars.trim_details as car_trim, cars.car_keys as keys_available, car_drives.drive_type as car_drive, 
        car_cylinders.cylinder as cylinder_no, cars.derivative_details as car_derivative, car_documents.doc_type as car_document, 
        car_documents.doc_valid as car_document_valid, cars.variant_details as car_variant, cars.seats as car_seats, 
        cars.doors as car_doors, cars.description as car_description, car_makes.name as car_make, car_models.name as car_model, 
        car_colours.name as car_colour, car_transmissions.name as transmission_type, car_bodies.type_name as car_body, 
        car_types.name as car_type, fuel_types.fuel_type as car_fuel, car_engines.engine_type as car_engine, 
        vehicletypes.vehicle as vehicle_type, 
      "
      )
  end

  # GET /cars/1 or /cars/1.json
  def show
    @car = Car.with_attached_images.find(params[:id])
  end

  # GET /cars/new
  def new
    @car = Car.new
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
        :drive_type, :car_keys, :car_primary_damage, :car_secondary_damage, :estimated_retail_price, :car_doc_id, 
        :car_highlights, :car_engine_id, :car_model_year, :seats,:doors, :vehicle_type_id, :status, :comments, images: [])
    end
end
