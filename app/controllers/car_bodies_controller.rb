class CarBodiesController < ApplicationController
  before_action :set_car_body, only: %i[ show edit update destroy ]

  # GET /car_bodies or /car_bodies.json
  def index
    @car_bodies = CarBody.all
  end

  # GET /car_bodies/1 or /car_bodies/1.json
  def show
  end

  # GET /car_bodies/new
  def new
    @car_body = CarBody.new
  end

  # GET /car_bodies/1/edit
  def edit
  end

  # POST /car_bodies or /car_bodies.json
  def create
    @car_body = CarBody.new(car_body_params)

    @car_body_name = (@car_body.type_name).downcase

    logger.info "Car body details -- #{ @car_body.inspect}"

    logger.info "Car body name -- #{ @car_body_name.inspect}"

    @count = 0

    @bodies_stored = CarBody.all

    @bodies_stored.each do |body|

      @exist_body = (body.type_name).downcase

      if @exist_body == @car_body_name
      
        @count += 1
      end

    end 


    
    logger.info "Count details -- #{ @count}"
    logger.info "Car body details -- #{ @car_body.inspect}"

    respond_to do |format|
      if @count > 0
        logger.info "Car body type already exists"
        format.html { render :new, status: :unprocessable_entity, notice: "Car body type already exists" }
        format.json { render json: @car_body.errors, status: :unprocessable_entity }
        
      else
        @car_body.save
        format.html { redirect_to car_bodies_path, notice: "Car body was successfully created." }
        format.json { render :show, status: :created, location: @car_body }
        
      end
    end
  end



  # PATCH/PUT /car_bodies/1 or /car_bodies/1.json
  def update
    respond_to do |format|
      if @car_body.update(car_body_params)
        format.html { redirect_to @car_body, notice: "Car body was successfully updated." }
        format.json { render :show, status: :ok, location: @car_body }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @car_body.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /car_bodies/1 or /car_bodies/1.json
  def destroy
    @car_body.destroy
    respond_to do |format|
      format.html { redirect_to car_bodies_url, notice: "Car body was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_car_body
      @car_body = CarBody.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def car_body_params
      params.require(:car_body).permit(:type_name, :status, :comments)
    end
end
