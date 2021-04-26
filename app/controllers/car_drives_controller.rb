class CarDrivesController < ApplicationController
  before_action :set_car_drive, only: %i[ show edit update destroy ]

  # GET /car_drives or /car_drives.json
  def index
    @car_drives = CarDrive.all
  end

  # GET /car_drives/1 or /car_drives/1.json
  def show
  end

  # GET /car_drives/new
  def new
    @car_drive = CarDrive.new
  end

  # GET /car_drives/1/edit
  def edit
  end

  # POST /car_drives or /car_drives.json
  def create
    @car_drive = CarDrive.new(car_drive_params)

    @all_drives = CarDrive.all

    @count = 0
    # logger.info "All colours ::: #{@all_colour.inspect}"

    @drive_typed = (@car_drive.drive_type).downcase
    logger.info "#{@drive_typed}"

    @all_drives.each do |drive|

      @index_drive = (drive.drive_type).downcase

      if @index_drive == @drive_typed

        @count += 1

      end 


      logger.info "#{@index_drive} --- make from loop"

    end 

    logger.info "Count details -- #{ @count}"
    logger.info "Car drives details -- #{ @car_drive.inspect}"

    respond_to do |format|
      if @count < 1 
        @car_drive.save
        format.html { redirect_to car_drives_path, notice: "Car drive was successfully created." }
        format.json { render :show, status: :created, location: @car_drive }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @car_drive.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /car_drives/1 or /car_drives/1.json
  def update
    respond_to do |format|
      if @car_drive.update(car_drive_params)
        format.html { redirect_to @car_drive, notice: "Car drive was successfully updated." }
        format.json { render :show, status: :ok, location: @car_drive }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @car_drive.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /car_drives/1 or /car_drives/1.json
  def destroy
    @car_drive.destroy
    respond_to do |format|
      format.html { redirect_to car_drives_url, notice: "Car drive was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_car_drive
      @car_drive = CarDrive.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def car_drive_params
      params.require(:car_drive).permit(:drive_type)
    end
end
